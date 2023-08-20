"use strict";

import { Router } from "express";
import type { IKeys } from "../../functions/keys";
import { keys as keyFunctions, sharex } from "../../functions";

const router: Router = Router();

router.post("/", (req, res) => {
  const { key } = req.headers as { key: string };

  const validKeys = keyFunctions.loadKeysFromFile();

  if (!key) {
    return res.status(403).json({
      status: 403,
      message: "You need to be authenticated to get your ShareX config.",
    });
  }

  if (!validKeys.some((k: IKeys) => k.key === key)) {
    return res.status(403).send({
      status: 403,
      message: "Invalid key, retard.",
    });
  }

  const config: sharex.IShareXConfig = sharex.generateShareXConfig(key);

  sharex.sendShareXConfig(res, config);
});

export default router;
