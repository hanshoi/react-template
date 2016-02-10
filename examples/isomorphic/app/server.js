import express from 'express';
import handlebars from "express-handlebars";
import React from  "react";
import ReactDOMServer from "react-dom/server";
import App from "./components/app";
 
const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.send(ReactDOMServer.renderToString(<App />));
});


app.listen(port, () => console.log('Server running on http://localhost:'+port));
