The link button renders a link as a button

    const Href = require('../../models/href/Href').default;

    <LinkButton
      ariaLabel="Hello Button"
      buttonStyle="secondary"
      className=""
      disabled={false}
      href={new Href('#')}
      name="buttonName"
      size="default"
      value="value"
      onBlur={() => {}}
      onClick={() => {}}
      onFocus={() => {}}
    >Hello Button</LinkButton>