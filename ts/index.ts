import express, { Express, Request, Response, NextFunction } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import config from "./config";

const app: Express = express();
const loggerMiddleware = morgan("dev");

const logger = (req: Request, res: Response, next: NextFunction) => {
  loggerMiddleware(req, res, (err: any) => {
    if (err) {
      console.error(`[ERROR] ${err.stack}`);
    }
    next();
  });
};

app
  .disable("x-powered-by")
  .use(fileUpload({ createParentPath: true }))
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(logger) // Use the custom logger middleware
  .set("views", "pages")
  .use("/api/content/raw", express.static("uploads"))
  .set("view engine", "ejs")
  .use("/", require("./routes/router"))
  .listen(config.port, () => {
    console.log(`[~~Daddy~~] Listening for fat cocks on port ${config.port}`);
  });
