import express, { Express } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import config from "./config";

const app: Express = express();

app
  .disable("x-powered-by")
  .use(fileUpload({ createParentPath: true }))
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(morgan("dev"))
  .set("views", "pages")
  .use("/api/content/raw", express.static("uploads"))
  .set("view engine", "ejs")
  .use("/", require("./routes/router"))
  .listen(config.port, () => {
    console.log(`[~~Daddy~~] Listening for fat cocks on port ${config.port}`);
  });
