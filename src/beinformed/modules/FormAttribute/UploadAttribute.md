Render an upload attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;
    
    const uploadAttribute = AttributeFactory.createAttribute('upload', {
      key: 'upload',
    }, {
      label: 'Upload Attribute',
    });

    <UploadAttribute
      attribute={uploadAttribute}
      id="uploadAttribute"
      name="uploadAttribute"
      onChange={() => {}}
    />