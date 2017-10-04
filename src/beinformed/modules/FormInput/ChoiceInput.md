Render a choice input

    const ChoiceAttributeOptionCollection = require('../../models/attributes/ChoiceAttributeOptionCollection').default;

    const optionCollection = new ChoiceAttributeOptionCollection();

    optionCollection.addOption({
      code: 'Value A', label: 'Option A',
    });
    optionCollection.addOption({
      code: 'Value B', label: 'Option B',
    });
    optionCollection.addOption({
      code: 'Value C', label: 'Option C',
    });
    optionCollection.addOption({
      code: 'Value D', label: 'Option D',
    });
    optionCollection.addOption({
      code: 'Value E', label: 'Option E',
    });
    optionCollection.addOption({
      code: 'Value F', label: 'Option F',
    });

    <ChoiceInput
      disabled={false}
      id="id"
      isTree={false}
      label="Choice input"
      name="name"
      options={optionCollection.all}
      readOnly={false}
      stacked={false}
      type="checkbox"
      onBlur={() => {}}
      onChange={() => {}}
      onFocus={() => {}}
    />