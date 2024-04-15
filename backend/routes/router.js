const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const router = express.Router();

const url = "https://medium.com/@pierrephilouze/list/uiux-design-aea9a113ca2d";

// Adjust your route handler to use async/await
router.get("/articles", async (req, res) => {
  try {
    const data = await Scrape(); // Wait for Scrape to complete and fetch the data
    res.send(data); // Send the data as the response
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    res.status(500).send("Error fetching articles");
  }
});

// Mark Scrape as an async function and include your scraping logic
async function Scrape() {
  try {
    const response = await axios.get(url); // Use await to wait for the Axios request to complete
    const html = response.data;
    const $ = cheerio.load(html);
    const articlesData = []; // Initialize an empty array to hold all articles' objects

    // Your logic to scrape articles
    let articles = $("article");

    // Shuffle the articles
    articles = shuffleArray(Array.from(articles)).slice(0, 5);

    articles.forEach((article) => {
      const title = $(article).find("h2").text() || "No Title Found";
      const authorP = $(article).find("p").eq(0); // This gets the first p in article
      const author = authorP.text() || "No Author Found";
      const dateSpan = $(article).find("span > div");
      const dateLastSpan = dateSpan.find("span").last();
      const date = dateLastSpan.text() || "No Date Found";
      const images = $(article).find("img");
      const imageUrl =
        images.length > 1 ? images.eq(1).attr("src") : "No Image URL Found";

      let articleUrl = "No URL Found";

      // Assuming that the <a> tag is an ancestor of the <h2> tag, not necessarily a direct parent
      const rawArticleUrl =
        $(article).find("h2").parent("a").attr("href") ||
        $(article).find("h2").parents("a").attr("href");

      if (rawArticleUrl) {
        // Prepend "https://medium.com" if not already present (it might already be absolute URL)
        articleUrl =
          !rawArticleUrl.startsWith("http:") &&
          !rawArticleUrl.startsWith("https:")
            ? `https://medium.com${rawArticleUrl}`
            : rawArticleUrl;
        // Cut the URL at the "?"
        articleUrl = articleUrl.split("?")[0];
      }

      // Append article data to the array as an object
      articlesData.push({
        title,
        author,
        date,
        imageUrl,
        articleUrl,
      });
    });

    return articlesData; // Return the array containing the scraped articles
  } catch (error) {
    console.error("Error during web scraping:", error);
    throw error; // Rethrow the error to be caught by the route handler
  }
}

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

module.exports = router;
