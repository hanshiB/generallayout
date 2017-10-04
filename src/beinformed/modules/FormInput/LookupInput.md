Render a LookupInput

    const LinkModel = require('../../models/links/LinkModel').default;
    const ChoiceAttributeOptionCollection = require('../../models/attributes/ChoiceAttributeOptionCollection').default;

    const optionCollection = new ChoiceAttributeOptionCollection();
    optionCollection.addOption({
      code: 'Value A', label: 'Option A',
    });
    optionCollection.select('Value A');

    <LookupInput
      disabled={false}
      isMultiple={false}
      lookupLink={new LinkModel()}
      name="name"
      options={optionCollection}
      readonly={false}
      onBlur={() => {}}
      onChange={() => {}}
      onFocus={() => {}}
    />