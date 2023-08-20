"use strict";

interface Config {
  port: number;
  dirs: string[];
  domains: string[];
}

const config: Config = {
  port: 8080,
  dirs: ["suicidey", "pp", "kms", "fbi", "cia", "666", "777"],
  domains: [
    "https://im.sleepdeprived.wtf",
    "https://ur.sleepdeprived.wtf",
    "https://probably.sleepdeprived.wtf",
    "https://because.sleepdeprived.wtf",
    "https://im.horny.rip",
    "https://ur.horny.rip",
    "https://probably.horny.rip",
    "https://because.horny.rip",
  ],
};

export default config;
