
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { ChatGPTAPI } from 'chatgpt';
import path from 'path';
global.fetch = fetch;

const app = express();
const PORT = 3001;



app.use(cors());
app.use(express.json());
app.use(express.static('public')); 


let parentMessageId;

let parentMessageId2;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;



const api = new ChatGPTAPI({
  apiKey: OPENAI_API_KEY,
  debug: true,
  
  
});

const api2 = new ChatGPTAPI({
  apiKey: OPENAI_API_KEY,
  debug: true,
  
  
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html')); // Send the index.html file
});

app.post('/chat1', async (req, res) => {
 const { prompt, systemMessage } = req.body;
  try {
  
    if (api) {
      
      const response = await api.sendMessage(prompt, {
        
        systemMessage,
        //onProgress: (partialResponse) => console.log(partialResponse.text)
      });
      
      res.send(response.text);
    } else {
      res.status(500).send('ChatGPTAPI not initialized.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
