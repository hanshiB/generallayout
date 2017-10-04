Renders a collection of filters

    const Href = require('../../models/href/Href').default;
    const FilterCollection = require('../../models/filters/FilterCollection').default;
    const FilterFactory = require('../../models/filters/FilterFactory').default;

    const stringFilter = FilterFactory.createFilter('string', { name: 'string' }, { label: 'String Filter' });
    const stringFilter2 = FilterFactory.createFilter('string', { name: 'string2' }, { label: 'String Filter' });
    const stringFilter3 = FilterFactory.createFilter('string', { name: 'string3' }, { label: 'String Filter' });

    const choiceFilter = FilterFactory.createFilter('choice', { name: 'choice' }, 
      { label: 'Choice Filter', options: [
        { code: '1', label: 'First option' },
        { code: '2', label: 'Second option' },
        { code: '3', label: 'Third option' },
        { code: '4', label: 'Fourth option' },
        { code: '5', label: 'Fifth option' },
        { code: '6', label: 'Sixth option' }
      ]
    });

    const choiceFilter2 = FilterFactory.createFilter('choice', { name: 'choice2' },
      { label: 'Choice Filter 2', options: [
        { code: 'A', label: 'First option A' },
        { code: 'B', label: 'Second option B' },
        { code: 'C', label: 'Third option C' }
      ]
    });
    
    const dateFilter = FilterFactory.createFilter('date', { name: 'date' }, { label: 'Date Filter' });

    const filterCollection = new FilterCollection();

    filterCollection.collection = [
      stringFilter,
      choiceFilter,
      dateFilter,
      stringFilter2,
      stringFilter3,
      choiceFilter2
    ];

    <Filters
      filterCollection={filterCollection}
      keepInView={false}
      listHref={new Href('#')}
      onFilterChange={() => {}}
      onReset={() => {}}
      onSubmit={() => {}}
    />