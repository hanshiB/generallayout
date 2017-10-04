Render a money attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;
    
    const moneyAttribute = AttributeFactory.createAttribute('money', {
      value: '12365',
    }, {
      label: 'Money Attribute',
      currencySymbol: '¥',
      format: '0',
    });

    <MoneyAttribute
      attribute={moneyAttribute}
      id="moneyAttribute"
      isFilter={false}
      name="moneyAttribute"
      onChange={() => {}}
    />