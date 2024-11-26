import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(props.pageSize);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstChar = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const loadData = async () => {
    // debugger;

    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${pageSize}`;
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(75);
    setArticles(
      articles.length > 1
        ? articles.concat(parsedData.articles)
        : parsedData.articles
    );
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setPage(page + 1);
    props.setProgress(100);

    console.log(parsedData);

    console.log(page);

    // setTimeout(() => {
    //   setLoading(!loading);
    // }, 1000);
  };

  useEffect(() => {
    document.title = `  ${capitalizeFirstChar(props.category)} - NewsMonkey`;

    props.setProgress(30);
    loadData();
    //props.setProgress(100);
  }, []);

  const fetchMoreData = () => {
    loadData();
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "70px 0px 10px" }}>
        NewsMonkey - Top {capitalizeFirstChar(props.category)} Headlines
      </h1>
      {loading && <Loader />}
      {articles && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loader />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : "unknown"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
