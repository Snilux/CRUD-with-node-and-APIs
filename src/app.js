const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const app = express();

/* importando routes */
const customersRoutes = require("./routes/customers");

app.set("port", process.env.PORT || 3000);
/* Motor de plantillas de express con ejs */
app.set("view engine", "ejs");
/* path de donde se encuentras las views __dirname devuelve la ruta donde se encuentra el archivo*/
app.set("views", path.join(__dirname, "views"));

/* middlewares */
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      port: "3306",
      database: "crudfarmacia",
    },
    "single"
  )
);

app.use(express.urlencoded({ extended: false }));

/* routes */
app.use("/", customersRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  console.log("Server on port 3000");
});
