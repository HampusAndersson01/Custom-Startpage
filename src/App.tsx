import React from "react";
import Links from "./components/Links";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      {/* <Dashboard /> */}
      <div>
        <SearchBar />
        <Links />
      </div>
    </div>
  );
};

export default App;
