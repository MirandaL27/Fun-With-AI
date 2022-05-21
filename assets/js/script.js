
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
            Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify(data),
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //call to display data here!
                    console.log(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Open OpenAI');
        });
}