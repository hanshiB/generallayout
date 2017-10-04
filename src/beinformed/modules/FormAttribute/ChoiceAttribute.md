Render a choiceattribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;

    const options = [
      { code: '1', label: 'Option 1' },
      { code: '2', label: 'Option 2' },
      { code: '3', label: 'Option 3' },
      { code: '4', label: 'Option 4' },
      { code: '5', label: 'Option 5' },
      { code: '6', label: 'Option 6' }
    ];

    const choiceAttribute = AttributeFactory.createAttribute('choice', { name: 'choice' }, { label: 'Choice Attribute', options });

    <ChoiceAttribute
      attribute={choiceAttribute}
      id="choiceattribute"
      name="choiceattribute"
      stacked={true}
      stackedItemCount={5}
      onChange={() => {}}
    />