

import React from "react";
import { Router } from "react-router-dom";
// 引入antd的国际化配置，来完成antd组件国际化
import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
// 引入自定义国际化方案
import { IntlProvider } from "react-intl";
import { zh, en } from "./locales";
import { connect } from "react-redux";


import history from "@utils/history";

import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

function App({language}) {
  const locale=language==="en" ? en : zh
  const messages=language==="en" ? enUS : zhCN
  return (
    <Router history={history}>
     <ConfigProvider locale={locale}>
      <IntlProvider locale={locale} messages={messages}>
      <Layout />
      </IntlProvider>
     </ConfigProvider>
    </Router>
  );
}

export default connect((state)=>({language:state.language}))(App);
