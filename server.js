
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { ChatGPTAPI } from 'chatgpt';
global.fetch = fetch;

const app = express();
const PORT = 3001;

const OPENAI_API_KEY = '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';

app.use(cors());
app.use(express.json());


let parentMessageId;



// Initialize ChatGPTAPI
const api = new ChatGPTAPI({
  apiKey: OPENAI_API_KEY,
  debug: true,
  
});

const api2 = new ChatGPTAPI({
  apiKey: OPENAI_API_KEY,
  debug: true,
  
});

app.post('/chat1', async (req, res) => {
 const { prompt, systemMessage } = req.body;
  console.log(systemMessage);
  try {
    // Send a message using ChatGPTAPI
    if (api) {
      // Send the message
      const response = await api.sendMessage(prompt, {
        parentMessageId,
        systemMessage,
        //onProgress: (partialResponse) => console.log(partialResponse.text)
      });
      parentMessageId = response.id;
      res.send(response.text);
    } else {
      res.status(500).send('ChatGPTAPI not initialized.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

app.post('/chat2', async (req, res) => {
  const { prompt, systemMessage } = req.body;
   console.log(systemMessage);
   try {
     // Send a message using ChatGPTAPI
     if (api) {
       // Send the message
       const response = await api.sendMessage(prompt, {
         parentMessageId,
         systemMessage,
         //onProgress: (partialResponse) => console.log(partialResponse.text)
       });
       parentMessageId = response.id;
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
