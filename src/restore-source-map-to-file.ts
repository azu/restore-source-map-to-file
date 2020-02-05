import { SourceMapConsumer } from "source-map";
import * as path from "path";
import * as fs from "fs";

export const restore = async (rawSourceMap: string, baseDir: string) => {
    await SourceMapConsumer.with(rawSourceMap, null, consumer => {
        consumer.sources.forEach(source => {
            const content = consumer.sourceContentFor(source);
            console.log(source, content);
            if (content) {
                const filePath = path.join(baseDir, source);
                fs.mkdirSync(path.dirname(filePath), {
                    recursive: true
                });
                fs.writeFileSync(filePath, content);
            }
        });
    });
};
