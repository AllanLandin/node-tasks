import fs from "node:fs";
import { parse } from "csv-parse";
import dotenv from "dotenv";
dotenv.config();

const csvPath = new URL("./tasks.csv", import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParser = parse({
  delimiter: ",",
  skipEmptyLines: true,
  fromLine: 2, // Pula a primeira linha de cabeçalho
});

export async function run() {
  const csvParsed = stream.pipe(csvParser);

  for await (const line of csvParsed) {
    const [title, description] = line;

    await fetch(`http://localhost:${process.env.SERVER_PORT}/tasks`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

run();
