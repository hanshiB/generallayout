Renders a String Filter Model

    const FilterFactory = require('../../models/filters/FilterFactory').default;
    const stringFilter = FilterFactory.createFilter('string', { name: 'string' }, { label: 'String Filter' });

    <Filter
      filter={stringFilter}
      onChange={() => {}}
    />

Renders a Choice Filter Model

    const FilterFactory = require('../../models/filters/FilterFactory').default;
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

    <Filter
      filter={choiceFilter}
      stackedItemCount={5}
      onChange={() => {}}
    />

Renders a Date Filter Model

    const FilterFactory = require('../../models/filters/FilterFactory').default;
    const dateFilter = FilterFactory.createFilter('date', { name: 'date' }, { label: 'Date Filter' });

    <Filter
      filter={dateFilter}
      onChange={() => {}}
    />
