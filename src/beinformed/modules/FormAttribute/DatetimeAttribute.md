Render a date attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;

    const dateAttribute = AttributeFactory.createAttribute('date', {
      name: 'date',
      value: '2017-06-03',
    }, {
      label: 'Date Attribute',
      format: 'DD-MM-YYYY',
    });
    
    <DatetimeAttribute
      attribute={dateAttribute}
      id="dateattribute"
      isFilter={false}
      name="dateattribute"
      onChange={() => {}}
    />

Render a time attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;

    const timeAttribute = AttributeFactory.createAttribute('time', {
      name: 'time',
      value: '21:23',
    }, {
      label: 'Time Attribute',
      format: 'HH:MM',
    });

    <DatetimeAttribute
      attribute={timeAttribute}
      id="timeattribute"
      isFilter={false}
      name="timeattribute"
      onChange={() => {}}
    />

Render a timestamp attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;

    const timestampAttribute = AttributeFactory.createAttribute('timestamp', {
      name: 'timestamp',
      value: '2017-06-03 12:32',
    }, {
      label: 'Timestamp Attribute',
      format: 'DD-MM-YYYY HH:mm:ss',
    });

    <DatetimeAttribute
      attribute={timestampAttribute}
      id="timestampattribute"
      isFilter={false}
      name="timestampattribute"
      onChange={() => {}}
    />
