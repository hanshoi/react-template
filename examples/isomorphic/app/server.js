import path from "path";
import express from 'express';
import handlebars from "express-handlebars";
import React from  "react";
import ReactDOMServer from "react-dom/server";
import App from "./components/app";
 
const app = express();
const port = 3000;

app.engine('handlebars', handlebars({defaultLayout: 'main', 
                                     layoutsDir: path.join(__dirname, 'views/layouts')}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'build')));


app.get('/', (request, response) => {
  response.render('app', {
    app: ReactDOMServer.renderToString(<App />)
  });
});


app.listen(port, () => console.log('Server running on http://localhost:'+port));
