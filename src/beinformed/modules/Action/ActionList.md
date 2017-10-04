Render a list of actions

    const ActionModel = require('../../models/actions/ActionModel').default;
    const actions = [
      new ActionModel({
        name: 'Action1',
      }),
      new ActionModel({
        name: 'Action2',
      }),
      new ActionModel({
        name: 'Action3',
      }),
    ];

    <ActionList
      actions={actions}
    />