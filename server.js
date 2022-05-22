import express from 'express';
import path from 'path'; // need path for making files paths
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import 'dotenv/config'
const myKey = process.env.API_KEY;
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//this get route serves the html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/openAPI', async (req, res) =>  {
    //make the fetch request to openAPI here!
    const data = await getData(req.body.promptText);
    res.send(data);
});

async function getData(promptText) {
    const data = {
        prompt: promptText,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };

    const resp = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myKey}`,
        },
        body: JSON.stringify(data),
    });
    const respdata = await resp.json();
    if (resp.status === 200) {
        return { prompt: promptText, response: respdata.choices[0].text };
    } else {
        let temp = 'Error: ' + resp.statusText;
        console.log('Error: ' + resp.statusText);
        return {error: temp};
    }
}

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});