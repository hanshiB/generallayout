Render one ore more action buttons into a dropdown
    
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

    <ActionChooser
      actions={actions}
      align="left"
      direction="down"
      dropdownTreshold={1}
      isDisabled={false}
      size="default"
    />