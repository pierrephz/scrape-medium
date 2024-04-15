function Articles({ articles, handleClick, handleClickBack }) {
  console.log(articles);
  return (
    <div className="flex flex-col items-center gap-5">
      {articles?.map((article, index) => (
        <div className="w-full max-w-4xl" key={index}>
          <a
            href={article.imageUrl}
            class="flex flex-col mx-auto items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg md:h-48 md:w-48 md:rounded-none md:rounded-s-lg"
              src={article.imageUrl}
              alt={article.title}
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {article.title}
              </h5>
              <span class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {article.author} • {article.date}
              </span>
              <div class="flex mt-4 md:mt-6">
                <a
                  href={article.articleUrl}
                  target="_blank"
                  class="inline-flex font-bold items-center text-blue-600 hover:underline underline-offset-4 decoration-2 w-fit"
                  rel="noreferrer"
                >
                  Read article
                  <svg
                    class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Articles;
