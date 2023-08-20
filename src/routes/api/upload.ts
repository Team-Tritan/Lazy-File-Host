import { Router, Request, Response } from "express";
import path from "path";
import config from "../../config";
import fs from "fs";

interface UploadedFile {
  name: string;
  mv: (path: string, callback?: (err: Error | null) => void) => void;
}

interface Keys {
  key: string;
  ip: any;
  created_at: string;
}

function generateRandomName(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const router: Router = Router();

router.post("/", (req: Request, res: Response) => {
  try {
    const { key } = req.headers as {
      key: string;
    };

    const keys = JSON.parse(fs.readFileSync("keys.json", "utf8"));

    if (!keys.some((k: Keys) => k.key === key)) {
      return res.status(403).send({
        status: 403,
        message: "Invalid key retard.",
      });
    }

    const { sharex } = req.files as { sharex?: UploadedFile | UploadedFile[] };

    if (!sharex || (Array.isArray(sharex) && sharex.length === 0)) {
      return res.status(404).send({
        status: 404,
        message: "No file uploaded, are you fucking stupid?",
      });
    }

    const singleSharex = Array.isArray(sharex) ? sharex[0] : sharex;
    const ext = path.extname(singleSharex.name);
    const name = generateRandomName(10);
    const dir = config.dirs[Math.floor(Math.random() * config.dirs.length)];
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    singleSharex.mv(`./uploads/${name}${ext}`, (err: Error | null) => {
      if (err) {
        return res.status(500).send({
          status: 500,
          message: "Failed to upload the file.",
          error: err.message,
        });
      }

      console.log(`${key} just uploaded ${name + ext} from ${ip}.`);

      const logEntry = {
        ip: ip,
        key: key,
        fileName: name + ext,
        timestamp: new Date().toISOString(),
      };

      const existingLogs = JSON.parse(
        fs.readFileSync("upload-log.json", "utf8")
      );

      existingLogs.push(logEntry);

      fs.writeFileSync(
        "upload-log.json",
        JSON.stringify(existingLogs, null, 2)
      );

      res.send({
        status: 200,
        message: "File just got uploaded!",
        url: `${dir}/${name}${ext}`,
      });
    });
  } catch (err: any) {
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: err.message,
    });
    console.error(`[ERROR] ${err.stack}`);
  }
});

export default router;
