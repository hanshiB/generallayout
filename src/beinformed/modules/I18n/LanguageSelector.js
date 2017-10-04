// @flow
import React from "react";

import Dropdown from "beinformed/modules/Dropdown/Dropdown";
import DropdownToggle from "beinformed/modules/Dropdown/DropdownToggle";
import DropdownLink from "beinformed/modules/Dropdown/DropdownLink";
import DropdownChildren from "beinformed/modules/Dropdown/DropdownChildren";

import Icon from "beinformed/modules/Icon/Icon";
import Href from "beinformed/models/href/Href";
import typeof Locales from "beinformed/i18n/Locales";

/**
 * Renders dropdown language selector
 */
const LanguageSelector = ({
  activeLocale,
  locales,
  onChange
}: {
  activeLocale: string,
  locales: Locales,
  onChange: Function
}) => (
  <div className="languageselector" data-language={activeLocale}>
    <Dropdown align="right">
      <DropdownToggle>
        <Icon name="globe" textAfter />
        <span className="link-text locale">{activeLocale}</span>
      </DropdownToggle>
      <DropdownChildren>
        {locales.all.map(locale => (
          <DropdownLink
            key={locale.code}
            id={`language-${locale.code}`}
            href={new Href("/")}
            onClick={() => onChange(locale.code)}
          >
            <Icon
              name={
                locale.code === activeLocale ? "check-circle-o" : "circle-o"
              }
              textAfter
            />
            <span className="link-text">{locale.nativeName}</span>
          </DropdownLink>
        ))}
      </DropdownChildren>
    </Dropdown>
  </div>
);

export default LanguageSelector;
