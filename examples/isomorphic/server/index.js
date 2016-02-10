import express from 'express';
import React from  "react";
import ReactDOMServer from "react-dom/server";
import App from "./generated/server.build";
 
const app = express();
 
app.get('/', (request, response) => {
  response.send(ReactDOMServer.renderToString(<App />));
});
 
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
