import React from "react";

import Sales from "./components/Sales";
import Search from "./components/Search";
import SearchRight from "./components/SearchRight";
import Visits from "./components/Visits";
import Static from "./components/Static";

export default function Admin () {
  return (
    <div>
      <Visits />
      <Sales />
      <Search />
      <SearchRight />
      <Static/>
    </div>
  );
}
