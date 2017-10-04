Renders a list of readonly attributes

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;

    const stringAttribute = AttributeFactory.createAttribute({
      name: 'string',
      value: 'test string',
    }, {
      type: 'string',
      label: 'String attribute',
    }, {});
    
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
    
    const passwordAttribute = AttributeFactory.createAttribute('password', {
      name: 'password',
      value: 'test password',
    }, {
      type: 'password',
      label: 'Password attribute',
    });
    
    const dateAttribute = AttributeFactory.createAttribute('date', {
      name: 'date',
      value: '2018-11-29',
    }, {
      type: 'date',
      label: 'Date attribute',
      format: 'DD-MM-YYYY',
    });
    
    const moneyAttribute = AttributeFactory.createAttribute('money', {
      name: 'money',
      value: '64835489.153',
    }, {
      type: 'money',
      label: 'Money attribute',
      currencySymbol: '€',
      format: '0,00',
    });

    <AttributeList
      attributes={[stringAttribute, choiceAttribute, passwordAttribute, dateAttribute, moneyAttribute]}
      direction="horizontal"
    />
