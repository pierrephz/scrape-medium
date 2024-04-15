import React, { useState, useEffect } from "react";
import "./App.css"; // Make sure you have an App.css file for styling
import Articles from "./Articles";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
// const apiKey = process.env.REACT_APP_API_KEY;

const url = apiUrl + "/articles";

function App() {
  const [articles, setArticles] = useState([]);

  const [introClassName, setintroClassName] = useState(
    "z-10 py-8 px-4 mx-auto max-w-screen-xl text-center content-center lg:py-16 relative"
  );

  const [articlesClassName, setarticlesClassName] = useState(
    "z-0 absolute left-0 top-0 h-screen w-screen opacity-0"
  );

  const handleClick = () => {
    axios.get(url).then((response) => {
      const Articles = response.data;
      console.log(Articles);

      setintroClassName(
        "z-0 py-8 px-4 mx-auto max-w-screen-xl content-center text-center lg:py-16 relative opacity-0 transition-opacity duration-300 ease-in-out"
      );

      setarticlesClassName(
        "z-10 absolute left-0 top-0 h-screen w-screen opacity-1 transition-opacity duration-300 delay-300 ease-in-out"
      );

      setArticles(Articles);

      window.scrollTo({
        top: 0,
        behavior: "smooth", // for a smooth scroll
      });
    });
  };

  const handleClickBack = () => {
    setintroClassName(
      "z-10 py-8 px-4 mx-auto content-center max-w-screen-xl text-center lg:py-16 relative opacity-1 transition-opacity duration-300 delay-300 ease-in-out overflow-hidden"
    );
    setarticlesClassName(
      "z-0 absolute left-0 top-0 h-screen w-screen opacity-0 transition-opacity duration-300 ease-in-out overflow-hidden"
    );
  };

  const showButton = articles.length > 0;

  return (
    <div className="relative">
      <header class="h-screen w-screen flex bg-white dark:bg-gray-900">
        <div className={introClassName}>
          <div
            class="cursor-default
           inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
          >
            <span class="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
              New
            </span>{" "}
            <span class="text-sm font-medium">Medium Scraper</span>
          </div>
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Scrap 5 UI/UX design articles
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
            Find articles curated in Medium and expend your design knowledge.
          </p>
          <button
            type="button"
            class="px-6 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-300"
            onClick={handleClick}
          >
            Scrape 5 articles &rarr;
          </button>
        </div>
        <div class="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
        <div className={articlesClassName}>
          <section class="dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
              <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Done!
              </h1>
              <p class="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                Enjoy, take notes.
              </p>
              <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"></div>
            </div>
          </section>
          <Articles
            articles={articles}
            handleClick={handleClick}
            handleClickBack={handleClickBack}
          />
          <section className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 flex flex-col gap-4 items-center">
            {showButton && (
              <>
                <button
                  type="button"
                  class="px-6 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition ease-in-out hover:-translate-y-0.5 hover:scale-110 duration-300 w-11/12 md:w-64"
                  onClick={handleClick}
                >
                  Scrape again &rarr;
                </button>
                <button
                  type="button"
                  class="py-3.5 px-6 text-base font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-11/12 md:w-64"
                  onClick={handleClickBack}
                >
                  Back to Welcome screen
                </button>
              </>
            )}
          </section>
          <section className="bg-black py-8 px-4 mx-auto w-screen text-center lg:py-16 flex flex-col gap-4 items-center">
            <p class="text-sm text-gray-100 dark:text-gray-400">
              Made with ❤️ by{" "}
              <a
                target="_blank"
                href="https://www.pierrephilouze.com/"
                class="text-blue-300 font-bold hover:underline underline-offset-4 decoration-2"
                rel="noreferrer"
              >
                Pierre Philz
              </a>
            </p>
          </section>
        </div>
      </header>
    </div>
  );
}

export default App;
