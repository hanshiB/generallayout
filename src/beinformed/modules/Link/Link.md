Render a link

    const Href = require('../../models/href/Href').default;
    
    <Link
      ariaLabel="Example ARIA label"
      className=""
      dataId="linkId"
      href={new Href("/")}
      isActive={false}
      isDisabled={false}
      isDownload={false}
      isNavLink={false}
      value="value"
      onBlur={() => { console.log('onBlur') }}
      onClick={() => { console.log('onBlur') }}
      onEnter={() => { console.log('onBlur') }}
      onFocus={() => { console.log('onBlur') }}
      onLeave={() => { console.log('onBlur') }}
    >Example Link</Link>