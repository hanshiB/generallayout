Render a number attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;
    
    const numberAttribute = AttributeFactory.createAttribute('number', {
      value: '12365.23',
    }, {
      label: 'Number Attribute',
      format: '0.00',
    });

    <NumberAttribute
      attribute={numberAttribute}
      id="numberAttribute"
      isFilter={false}
      name="numberAttribute"
      onChange={() => {}}
    />
