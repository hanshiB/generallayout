Render a range attribute for forms, including label, assistant, input, etc

    const AttributeFactory = require('../../models/attributes/AttributeFactory').default;
    
    const rangeAttribute = AttributeFactory.createAttribute('range', {
      key: 'Range',
      start: {
        key: 'DateFrom',
        value: '2010-11-20',
      },
      end: {
        key: 'DateTo',
        value: '2011-02-03',
      },
    }, {
      label: 'Range Attribute',
      children: [
        {
          DateFrom: {
            label: 'Date from',
            type: 'date',
            mandatory: true,
            format: 'dd-MM-yyyy',
          },
        },
        {
          DateTo: {
            label: 'Date to',
            type: 'date',
            mandatory: false,
            format: 'dd-MM-yyyy',
          },
        },
      ],
    });

    <RangeAttribute
      attribute={rangeAttribute}
      id="rangeAttribute"
      isFilter={false}
      name="rangeAttribute"
      namePrefix="prefix"
      onChange={() => {}}
    />