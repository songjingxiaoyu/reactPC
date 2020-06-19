


import React, { Component } from "react";

import Search from "./components/Search";
import List from "./components/List";

export default class Chapter extends Component {
  //创建ref
  fullscreenRef=React.createRef()
  render() {
    return (
      <div ref={this.fullscreenRef} style={{backgroundColor:"#f5f5f5"}}>
        <Search />
        <List fullscreenRef={this.fullscreenRef}/>
      </div>
    );
  }
}
