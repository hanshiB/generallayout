Render a date attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;

    const lookupAttribute = AttributeFactory.createAttribute('lookup', {
      _links: {
        lookupservice: {
          href: '#',
        },
      },
      dynamicschema: [{
        code: '1',
        label: 'Option 1',
      }],
      value: '1',
    }, {
      label: 'Lookup Attribute',
    });

    <LookupAttribute
      attribute={lookupAttribute}
      id="dateattribute"
      isFilter={false}
      name={dateattribute}
      onChange={() => {}}
    />