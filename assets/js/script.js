var myKey = config.API_KEY;
var responses = [];
var bodyEl = document.querySelector("body");
var formEl = document.querySelector(".promptForm");
var promptEl = document.querySelector(".prompt");


bodyEl.addEventListener("submit", function (event) {
    event.preventDefault();
    let promptText = promptEl.value;
    fetchData(promptText);
});

function fetchData(promptText) {
    const data = {
        prompt: promptText,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myKey}`,
        },
        body: JSON.stringify(data),
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //call to display data here!
                    responses.push({prompt: promptText, response: data.choices[0].text});
                    displayResponses();
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Open OpenAI');
        });
}

function displayResponses(){
    //removes old reponses
    let containerEl = document.querySelector(".response-container");
    containerEl.remove();

    //create new responses
    containerEl=document.createElement("section");
    containerEl.className ="response-container";
    console.log(responses);
    for(let i=responses.length-1;i>=0;i--){
        let divEl = document.createElement("div");

        let promptDiv = document.createElement("div");
        let promptLableEl = document.createElement("h3");
        promptLableEl.textContent = "Prompt: ";
        let promptTextEl = document.createElement("p");
        promptTextEl.textContent = responses[i].prompt;
        promptDiv.appendChild(promptLableEl);
        promptDiv.appendChild(promptTextEl);

        let responseDiv = document.createElement("div");
        let responseLabelEl = document.createElement("h3");
        responseLabelEl.textContent = "Response: ";
        let responseTextEl = document.createElement("p");
        responseTextEl.textContent = responses[i].response;
        responseDiv.appendChild(responseLabelEl);
        responseDiv.appendChild(responseTextEl);

        divEl.appendChild(promptDiv);
        divEl.appendChild(responseDiv);
        containerEl.appendChild(divEl);
    }

    bodyEl.appendChild(containerEl);
}