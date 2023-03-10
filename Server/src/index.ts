// Imports
import { config } from "dotenv";
import Server from "./server";

// Config dotenv
config();

// Start server
const server = Server.getInstance(Number(process.env.PORT) || 3000);
server.setMiddlewares();
server.routes();
server.setErrorMiddlewares();
server.start();