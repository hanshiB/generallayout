Render a string attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;
    
    const stringAttribute = AttributeFactory.createAttribute('string', {
      value: 'Example string',
    }, {
      label: 'String Attribute',
    });

    <StringAttribute
      attribute={stringAttribute}
      id="stringAttribute"
      isFilter={false}
      name="stringAttribute"
      onChange={() => {}}
    />