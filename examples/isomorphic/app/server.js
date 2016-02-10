import express from 'express';
import handlebars from "express-handlebars";
import React from  "react";
import ReactDOMServer from "react-dom/server";
import App from "./components/app";
 
const app = express();
const port = 3000;

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (request, response) => {
  response.render({
    app: ReactDOMServer.renderToString(<App />)
  });
});


app.listen(port, () => console.log('Server running on http://localhost:'+port));
