Render a password attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;
    
    const passwordAttribute = AttributeFactory.createAttribute('password', {
      value: 'rootadmin',
    }, {
      label: 'Password Attribute',
    });

    <PasswordAttribute
      attribute={passwordAttribute}
      id="passwordAttribute"
      name="passwordAttribute"
      onChange={() => {}}
    />