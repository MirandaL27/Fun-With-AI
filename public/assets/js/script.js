var responses = [];
var bodyEl = document.querySelector("body");
var formEl = document.querySelector(".promptForm");
var promptEl = document.querySelector(".prompt");


bodyEl.addEventListener("submit", function (event) {
    event.preventDefault();
    let promptText = promptEl.value;
    fetchData(promptText);
});

async function fetchData(promptText) {
    const response = await fetch(`/openAPI`, {
        method: 'POST',
        body: JSON.stringify({
          promptText
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const respdata = await response.json();
    console.log(respdata);
      if (!respdata.error) {
          //call to display data here!
            responses.push({prompt: respdata.prompt, response: respdata.response});
            displayResponses();
      } else {
        alert(respdata.error);
      }
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