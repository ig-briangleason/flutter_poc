require('dotenv').config();
require("isomorphic-fetch");
import { startServer } from "@Server/server";

const throng = require('throng');
const WORKERS = process.env.WEB_CONCURRENCY || 1;
console.log(`WEB_CONCURRENCY set to ${WORKERS}`);

if (process.env.NODE_ENV === "production") {
  console.log("Starting up in PRODUCTION mode");
  throng({workers: WORKERS, lifetime: Infinity}, startServer);
} else {
  console.log("Starting up in DEV/TEST mode");
  startServer();
}
