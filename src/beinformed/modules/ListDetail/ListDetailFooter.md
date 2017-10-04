
### Structure
```jsx static

    <PanelFooter>
       <ActionChooser />
      <LinkButton>
        <Icon name="folder-open" />
      </LinkButton>
    </PanelFooter>
```

List detail footer consists of a [PanelFooter](http://localhost:6060/#panelfooter) containing a
  [ActionChooser](http://localhost:6060/#actionchooser) and a [LinkButton](http://localhost:6060/#linkbutton)


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

    <PanelFooter >
       <ActionChooser actions={actions} direction="up" />
      <LinkButton
        href="#"
        className="btn-opencase card-link float-lg-right"
        buttonStyle="primary"
        onClick=""
      >
      <Icon name="folder-open" /> title
    </LinkButton>
    </PanelFooter>