const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRouterPath = "/api/users";
    this.authPath = "/api/auth";

    //Connect to Database
    this.ConnectDB();
    //Middleware
    this.middleware();
    //Rutas de mi aplicacion
    this.routes();
  }

  async ConnectDB() {
    await dbConnection();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosRouterPath, require("../routes/users.routes"));
    this.app.use(this.authPath, require("../routes/auth.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`POO Server is working in port: ${this.port}`);
    });
  }
}

module.exports = Server;
