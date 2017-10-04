// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";

import Icon from "beinformed/modules/Icon/Icon";
import Link from "beinformed/modules/Link/Link";

type AttributeValueProps = { className?: string, attribute?: AttributeType };

import "./AttributeValue.scss";

/**
 * Render readonly attribute values
 */
class AttributeValue extends PureComponent<AttributeValueProps> {
  getEmptyValue() {
    return "\u00a0";
  }

  getDownloadLink(attribute: AttributeType) {
    return (
      <Link href={attribute.downloadLink.href} isDownload>
        <Icon name="download" textAfter />
        {attribute.readonlyvalue}
      </Link>
    );
  }

  getPasswordAttribute() {
    return "********";
  }

  getRangeAttribute(attribute: AttributeType) {
    return `${attribute.start.readonlyvalue} - ${attribute.end.readonlyvalue}`;
  }

  getCompositeAttribute(attribute: AttributeType) {
    return attribute.children.map((childAttribute, i) => (
      <div key={i} className="composite-attribute-child">
        <div className="composite-attribute-child-label text-small">
          {childAttribute.label}
        </div>

        {this.renderValue(childAttribute)}
      </div>
    ));
  }

  getReadonlyValue(attribute: AttributeType) {
    return attribute.readonlyvalue;
  }

  // eslint-disable-next-line max-statements
  getAttributeValue(attribute: AttributeType) {
    if (!attribute || !attribute.readonlyvalue) {
      return this.getEmptyValue();
    }

    if (attribute.readonlyvalue && attribute.downloadLink) {
      return this.getDownloadLink(attribute);
    }

    if (attribute.type === "password") {
      return this.getPasswordAttribute();
    }

    if (attribute.type === "range") {
      return this.getRangeAttribute(attribute);
    }

    if (attribute.type === "composite") {
      return this.getCompositeAttribute(attribute);
    }

    if (attribute.readonlyvalue) {
      return this.getReadonlyValue(attribute);
    }

    return "Unknown value";
  }

  renderValue(attribute: AttributeType) {
    const cssclass = classNames(
      this.props.className,
      "attribute-value",
      `attribute-type-${attribute.type}`,
      {
        "text-right":
          attribute && attribute !== null && attribute.alignment === "right",
        "text-center":
          attribute && attribute !== null && attribute.alignment === "center"
      }
    );

    return <div className={cssclass}>{this.getAttributeValue(attribute)}</div>;
  }

  render() {
    return this.renderValue(this.props.attribute);
  }
}

export default AttributeValue;
