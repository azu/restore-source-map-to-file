import meow from "meow";

import { restore } from "./restore-source-map-to-file";
import * as fs from "fs";

const cli = meow(
    `
    Usage
      $ restore-source-map-to-file [source-map-file] --out-dir [dir]
 
    Options
      --out-dir Output dir
 
    Examples
      $ restore-source-map-to-file main.js.map --out-dir ./main-original
`,
    {
        flags: {
            outDir: {
                type: "string"
            }
        },
        autoHelp: true,
        autoVersion: true
    }
);

export const run = async () => {
    const content = fs.readFileSync(cli.input[0], "utf-8");
    return restore(content, cli.flags.outDir);
};
