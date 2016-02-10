import express from 'express';
import React from  "react";
import ReactDOMServer from "react-dom/server";
import App from "";
 
const app = express();
 
app.get('/', (request, response) => {
  response.send('Hello world from Express');
});
 
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
