import { Router, Request, Response } from "express";
import fs from "fs";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const keys = JSON.parse(fs.readFileSync("keys.json", "utf8"));

    const newKey = {
      key: generateRandomKey(10),
      created_at: new Date().toISOString(),
      ip: ip,
    };

    keys.push(newKey);

    fs.writeFileSync("keys.json", JSON.stringify(keys, null, 2));

    res.send({
      status: 200,
      message: "Key created successfully.",
      key: newKey.key,
    });
  } catch (err) {
    console.error(`Failed to create key: ${err}`);
    res.status(500).send({
      status: 500,
      message: "Failed to create key.",
      error: err,
    });
  }
});

function generateRandomKey(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

export default router;
