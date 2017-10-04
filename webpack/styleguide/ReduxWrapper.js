import React, { Component } from "react";
import { Provider } from "react-redux";

import { createClientStore } from "../../src/beinformed/redux/createStore";

const store = createClientStore({});

export default class Wrapper extends Component {
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
}
