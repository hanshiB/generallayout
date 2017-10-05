// @flow
import React, { PureComponent } from "react";

import "./Breadcrumb.scss";

class Breadcrumb extends PureComponent<> {
  render() {
    return (
      <nav className="accountsummary breadcrumb">
        <a className="breadcrumb-item" href="#a">
          Home
        </a>
        <a className="breadcrumb-item" href="#a">
          online banking
        </a>
        <a className="breadcrumb-item" href="#a">
          account summary
        </a>
      </nav>
    );
  }
}
export default Breadcrumb;
