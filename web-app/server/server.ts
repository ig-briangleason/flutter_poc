require('dotenv').config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { apolloServer } from "@Server/graphql/endpoint";
import * as cors from "cors";
import { inferDeviceType } from './managers/device-type';

const basicAuth = require("express-basic-auth");
const path = require("path");
const git = require('git-rev-sync');
const glob = require("glob");

const router = express.Router();
const app = express();

export function startServer() {
  process.env["JS_FILENAME"] = glob.sync("main.*.js", { cwd: './dist/public/' })[0];
  process.env["CSS_FILENAME"] = glob.sync("main.*.css", { cwd: './dist/public/' })[0];

  let validJS = true;
  if (process.env.JS_FILENAME != "undefined") {
    console.log("\x1b[32m", `${String.fromCodePoint(0x2023)} Javascript bundle loaded: ${process.env.JS_FILENAME}`, "\x1b[0m"); //code at end resets console styling
  } else {
    validJS = false;
    console.error("\x1b[31m", `${String.fromCodePoint(0x2757)}${String.fromCodePoint(0x2757)} Javascript bundle failed to load`, "\x1b[0m");
  }

  let validCSS = true;
  if (process.env.CSS_FILENAME != "undefined") {
    console.log("\x1b[32m", `${String.fromCodePoint(0x2023)} CSS bundle loaded: ${process.env.CSS_FILENAME}`, "\x1b[0m");
  } else {
    validCSS = false;
    console.error("\x1b[31m", `${String.fromCodePoint(0x2757)} CSS bundle failed to load`, "\x1b[0m");
  }

  apolloServer.applyMiddleware({ app });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.set("view engine", "pug");
  app.set("views", path.resolve(".") + "/views");

  if (process.env.BASIC_AUTH_ENABLED) {
    app.use("/", basicAuth({
      users: { "admin": process.env.BASIC_AUTH_PASSWORD },
      challenge: true
    }));
  }

  if (process.env.NODE_ENV === "development") {
    app.use(cors());
  }

  app.use(express.static("./dist/public")); //serves the index.html

  registerRoutes(generateViewProps());
  app.use(errorHandler);

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  return app.listen(port, () => {
    if (validCSS && validJS) {
      console.log("\x1b[42m", "\x1b[30m", `${String.fromCodePoint(0x2713)} Up and running on port ${Number(process.env.PORT)}`, "\x1b[0m");
    } else {
      console.error("\x1b[43m", "\x1b[30m", "Server running, but missing client files.", "\x1b[0m", "Is the client watcher running?");
    }
  });
}

function generateViewProps() {
  let gitInfo = undefined;
  if (process.env.NODE_ENV !== 'production' && git.branch() !== "master") {
    gitInfo = {
      currentBranch: git.branch(),
      currentHash: git.short(),
      fullHash: git.long(),
      gitRepoUrl: process.env.GIT_REPO_URL
    };
  } else {
    gitInfo = {
      currentBranch: process.env.GIT_BRANCH,
      currentHash: process.env.GIT_HASH,
      fullHash: process.env.GIT_HASH_FULL,
      gitRepoUrl: process.env.GIT_REPO_URL
    };
  }

  return {
    jsUrl: (process.env.CDN_URL ? process.env.CDN_URL : "/") + process.env.JS_FILENAME,
    cssUrl: (process.env.CDN_URL ? process.env.CDN_URL : "/") + process.env.CSS_FILENAME,
    gitDetailsHidden: process.env.GIT_DETAILS_HIDDEN,
    gitInfo
  };
}

function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message);
}

function registerRoutes(viewProps: any) {
  // router.use('/flutter', express.static('../flutter-wheel/build/web'));
  router.use('/flutter', express.static('flutter/web'));

  router.get("*", (req, res) => {
    res.render("index.pug", { ...viewProps, mainId: "ig-web", deviceType: getDeviceTypeViewProps(req) });
  });
  app.use('/', router);
}

function getDeviceTypeViewProps(req: express.Request) {
  return JSON.stringify(inferDeviceType(req.query, req.headers["user-agent"] as string));
}
