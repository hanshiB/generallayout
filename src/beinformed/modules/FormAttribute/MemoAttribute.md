Render a date attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;

    const memoAttribute = AttributeFactory.createAttribute('memo', {
      value: 'Example of a memo attribute\nSecond line of the memo attribute',
    }, {
      label: 'Memo Attribute',
    });

    <MemoAttribute
      attribute={memoAttribute}
      id="memoattribute"
      name="memoattribute"
      onChange={() => {}}
    />

Render a date attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;

    const formattedMemoAttribute = AttributeFactory.createAttribute('memo', {
      value: 'Example of a formatted memo attribute\nSecond line of the formatted memo attribute',
    }, {
      label: 'Formatted Memo Attribute',
      formatted: true,
    });

    <MemoAttribute
      attribute={formattedMemoAttribute}
      id="formattedMemoAttribute"
      name="formattedMemoAttribute"
      onChange={() => {}}
    />

Render a XML attribute for forms, including label, assistant, input, etc
    
    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;

    const xmlAttribute = AttributeFactory.createAttribute('xml', {
      value: '<root>\n  <node1>\n    <node2>Node 2</node2>\n    <node2>Node 2b</node2>\n  </node1>\n</root>',
    }, {
      label: 'XML Attribute',
    });

    <MemoAttribute
      attribute={xmlAttribute}
      id="xmlAttribute"
      name="xmlAttribute"
      onChange={() => {}}
    />