import React, { Component } from "react";

import { connect } from "react-redux";

import PrimaryLayout from "./PrimaryLayout";
import PublicLayout from "./PublicLayout";
import { Authorized } from "../components/Authorized";

@connect((state) => ({ token: state.token }))
class BasicLayout extends Component {
  render() {
    const { token } = this.props;
    //有token是已登录
    //判断有token加载PrimaryLayout
    if (token) {
      return (
        <Authorized
          render={(routes) => {
            return <PrimaryLayout routes={routes} />;
          }}
        />
      );
    }
    //判断没有token加载PublicLayout
    return <PublicLayout />;
  }
}

export default BasicLayout;
