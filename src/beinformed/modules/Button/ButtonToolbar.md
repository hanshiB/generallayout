A ButtonToolbar can be used to combine multiple ButtonGroups on a single line into a group

    const Button = require('./Button').default;
    const ButtonGroup = require('./ButtonGroup').default;

    <ButtonToolbar ariaLabel="Dummy toolbar">
      <ButtonGroup className="mr-2">
        <Button>A</Button>
        <Button>B</Button>
        <Button>C</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>D</Button>
        <Button>E</Button>
      </ButtonGroup>
    </ButtonToolbar>
