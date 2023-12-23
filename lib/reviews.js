import { readdir } from "node:fs/promises";
import { marked } from "marked";
import qs from "qs";
const CMS_URL = "http://localhost:1337";
////Function will return the lataset one for homepage.
// export async function getFeaturedReview() {
//   const reviews = await getReviews();
//   return reviews[0];
// }

///function return the data of slug request
export async function getReview(slug) {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });

  // const response = await fetch(url);
  // const { data } = await response.json();

  const { attributes } = data[0];
  // ///destract the text
  // Extract text from the nested structure
  const bodyText = attributes.body
    .map((paragraph) => {
      return paragraph.children
        .map((child) => {
          if (child.type === "text") {
            return child.text;
          }
          return ""; // Handle other types if needed
        })
        .join("");
    })
    .join("");
  return {
    ...toReview(data[0]),
    // slug: attributes.slug,
    // title: attributes.title,
    // date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    // image: CMS_URL + attributes.image.data[0].attributes.url,
    body: marked(bodyText),
  };
}

/////data we need to show to user
/*
    slug: 'hellblade',
    title: 'Hellblade',
    date: '2023-05-06',
    image: '/images/hellblade.jpg',
*/

///////the function will return all md file and arry cintain them.

export async function getReviews(pageSize) {
  const { data } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize },
  });
  return data.map(toReview);

  // const url =
  //   `${CMS_URL}/api/reviews?` +
  //   qs.stringify(
  //     {
  //       fields: ["slug", "title", "subtitle", "publishedAt"],
  //       populate: { image: { fields: ["url"] } },
  //       sort: ["publishedAt:desc"],
  //       pagination: { pageSize: 6 },
  //     },
  //     { encodeValuesOnly: true }
  //   );
  // console.log("getReviews:", url);
  // const response = await fetch(url);
  // const { data } = await response.json();
  // return data.map(({ attributes }) => ({
  //   slug: attributes.slug,
  //   title: attributes.title,
  //   date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
  //   image: attributes.image?.data[0]?.attributes?.url
  //     ? CMS_URL + attributes.image.data[0].attributes.url
  //     : null,
  // }));
}

// ///get all slugs from data.
export async function getSlugs() {
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  return data.map((item) => item.attributes.slug);
}

/////////Global function fatch any data.
async function fetchReviews(parameters) {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, { encodeValuesOnly: true });
  console.log("[fetchReviews]:", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}

function toReview(item) {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: attributes.image?.data[0]?.attributes?.url
      ? CMS_URL + attributes.image.data[0].attributes.url
      : null,
  };
}
