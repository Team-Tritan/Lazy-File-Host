import express, { Express, Request, Response } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import config from "./config";
import router from "./routes/router"; 

const app: Express = express();

app
  .use(morgan("dev")) 
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(fileUpload({ createParentPath: true }))
  .disable("x-powered-by")
  .set("views", "pages")
  .set("view engine", "ejs")
  .use("/api/content/raw", express.static("uploads"))
  .use("/", router)
  .listen(config.port, () => {
  console.log(`[~~Daddy~~] Listening for fat cocks on port ${config.port}`);
});
