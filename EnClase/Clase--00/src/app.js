import express from "express";
import todoRouter from "./routes/todo.routes.js";
import exphbs from "express-handlebars";
const app = express();
const PORT = 8080;


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));


//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas
app.use ("/", todoRouter)



app.listen(PORT, () => {
    console.log(`Servidor express corriendo en el puerto ${PORT}`);
})