Render a readonly value of a list or detail
    
    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;
    
    const choiceAttribute = AttributeFactory.createAttribute('choice', {
      name: 'choice',
      value: 'option1',
    }, {
      type: 'choice',
      label: 'Choice attribute',
      options: [
        {
          code: 'option1', label: 'Option 1',
        },
        {
          code: 'option2', label: 'Option 2',
        },
      ],
    });

    <AttributeValue
      attribute={choiceAttribute}
    />