import { writeFileSync } from "node:fs";
import fetch from "node-fetch";
import qs from "qs";

async function fetchDataAndWriteToFile() {
  const url =
    "http://localhost:1337/api/reviews" +
    "?" +
    qs.stringify(
      {
        filters: { slug: { $eq: "celeste" } },
        fields: ["slug", "title", "subtitle", "publishedAt", "body"],
        populate: { image: { fields: ["url"] } },
        pagination: { pageSize: 1, withCount: false },
        // sort: ["publishedAt:desc"],
        // pagination: { pageSize: 6 },
      },
      { encodeValuesOnly: true }
    );
  console.log("url:", url);
  const response = await fetch(url);
  const body = await response.json();
  const formatted = JSON.stringify(body, null, 2);
  const file = "scripts/strapi-response.json";
  writeFileSync(file, formatted, "utf8");
  console.log(`File ${file} has been created successfully.`);
}

fetchDataAndWriteToFile();
