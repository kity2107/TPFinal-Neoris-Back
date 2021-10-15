//importaciones
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
//crea el servido express
const app = express();
const cors = require("cors");

//requiero la conecxion a la base de datos
const { mongoose } = require("./database/db");

const path = require("path");

//configuracion del ambiente LOCAL
const host = process.env.SERVER_HOST_NAME;
const puertoServidor = process.env.SERVER_PORT;

//midlewares
app.use(morgan("dev"));
app.use(express.json());
//cors
app.use(cors());

//rutas
const {
  auth,
  rutaEmpleados,
  rutaJornada,
  rutaTipoJornada,
} = require("./routes/index");
app.use("/api/empleados", rutaEmpleados);
app.use("/api/jornada", rutaJornada);
app.use("/api/tipojornada", rutaTipoJornada);
app.use("/api/auth", auth);

//static files

app.use(express.static(path.join(__dirname, "public")));

//listener del servidor
app.listen(puertoServidor, () => {
  console.log(
    `El servidor se esta ejecuatando en http://${host}:${puertoServidor}`
  );
});
