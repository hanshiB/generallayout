// @flow
import React from "react";
import classNames from "classnames";

import Link from "beinformed/modules/Link/Link";
import Href from "beinformed/models/href/Href";

type CharType = {
  char: string,
  href: Href,
  isActive: boolean,
  isEnabled: boolean,
  onClick: (href: Href) => void
};

type CharIndexType = {
  active: Array<string>,
  enabled: Array<string>,
  href: Href,
  onSelect: (href: Href) => void
};

/**
 * Character in the index
 */
const Char = ({ char, href, isEnabled, isActive, onClick }: CharType) => {
  const linkClass = classNames("btn btn-light", {
    active: isActive
  });

  const charHref = new Href(href).addParameter("index", char);

  if (isEnabled) {
    return (
      <Link
        className={linkClass}
        dataId={char}
        href={charHref}
        onClick={onClick}
      >
        {char}
      </Link>
    );
  }

  return (
    <span className="btn btn-light disabled" data-id={char}>
      {char}
    </span>
  );
};

/**
 * Character index
 */
const CharIndex = ({
  enabled = [],
  active = [],
  href,
  onSelect
}: CharIndexType) => {
  const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0_".split("");
  const charsNotInDefault = enabled
    ? enabled.filter(enabledChar => !allChars.includes(enabledChar))
    : [];

  return (
    <div className="character-index btn-toolbar mb-1">
      <div
        className="btn-group btn-group-sm"
        role="group"
        aria-label="Character index"
      >
        {allChars.map(char => (
          <Char
            key={char}
            char={char}
            href={href}
            isEnabled={enabled.includes(char)}
            isActive={active.includes(char)}
            onClick={onSelect}
          />
        ))}
        {charsNotInDefault.map(char => (
          <Char
            key={char}
            char={char}
            href={href}
            isEnabled
            isActive={active.includes(char)}
            onClick={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default CharIndex;
