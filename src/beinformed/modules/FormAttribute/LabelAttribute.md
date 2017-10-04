Render a label attribute for forms

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;

    const labelAttribute = AttributeFactory.createAttribute('label', {
      name: 'label',
    }, {
      label: 'This is an example of a label attribute',
    });

    <LabelAttribute
      attribute={labelAttribute}
    />