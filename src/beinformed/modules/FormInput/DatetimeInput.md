Render a datetime input

    const moment = require('moment');

    <DatetimeInput
      ariaLabel="Aria label"
      ariaLabelledBy=""
      disabled={false}
      format="DD-MM-YYYY"
      id="id"
      inError={false}
      mindate={moment('2000-01-01')}
      maxdate={moment('2050-01-01')}
      name="name"
      placeholder="Placeholder"
      readOnly={false}
      value="12-12-2012"
      onBlur={() => {}}
      onChange={() => {}}
      onFocus={() => {}}
    />