import "./App.css";

import React, { Component, useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  // 6a237f974cba491abcf83437099a68a6===
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  // state = { progress: 0 };
  // setProgress = (progress) => {
  //   this.setState({ progress: progress });
  // };

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pageSize={10}
                country="us"
                category="general"
              />
            }
          ></Route>
          <Route
            path="/business"
            exact
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="business"
                pageSize={10}
                country="us"
                category="business"
              />
            }
          ></Route>
          <Route
            path="/entertainment"
            exact
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="entertainment"
                pageSize={10}
                country="us"
                category="entertainment"
              />
            }
          ></Route>
          <Route
            path="/health"
            exact
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="health"
                pageSize={10}
                country="us"
                category="health"
              />
            }
          ></Route>
          <Route
            path="/science"
            exact
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="science"
                pageSize={10}
                country="us"
                category="science"
              />
            }
          ></Route>
          <Route
            path="/sports"
            exact
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="sports"
                pageSize={10}
                country="us"
                category="sports"
              />
            }
          ></Route>
          <Route
            path="/technology"
            exact
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="technology"
                pageSize={10}
                country="us"
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;

