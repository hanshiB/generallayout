Render a Dropdown with items

    const DropdownToggle = require('./DropdownToggle').default;
    const DropdownItem = require('./DropdownItem').default;

    <Dropdown
      activeValue="test value"
      align="left"
      direction="down"
    >
      <DropdownToggle>DropdownToggle</DropdownToggle>
      <DropdownItem>DropdownItem 1</DropdownItem>
      <DropdownItem>DropdownItem 2</DropdownItem>
      <DropdownItem>DropdownItem 3</DropdownItem>
      <DropdownItem>DropdownItem 4</DropdownItem>
    </Dropdown>

Render a Dropdown with links

    const DropdownToggle = require('./DropdownToggle').default;
    const DropdownItem = require('./DropdownItem').default;

    <Dropdown
      activeValue="test value"
      align="left"
      direction="down"
    >
    <DropdownChildren>
      <DropdownButton>DropdownButton</DropdownButton>
      <DropdownLink>DropdownLink 1</DropdownLink>
      <DropdownLink>DropdownLink 2</DropdownLink>
      <DropdownLink>DropdownLink 3</DropdownLink>
      <DropdownLink>DropdownLink 4</DropdownLink>
     </DropdownChildren>
    </Dropdown>
