Renders ContextItems in a breadcrumb

    const ContextModel = require('../../models/context/ContextModel').default;
    const Href  = require('../../models/href/Href').default;

    const contextModel = new ContextModel('first', new Href('#first'), 'First list');
    contextModel.addItem('first', new Href('#first'), new Href('#firstdetail'), 'First list: First detail');
    contextModel.addItem('second', new Href('#second'), null, 'Second list');

    <Breadcrumb items={contextModel} onItemClick={action('click')} />

