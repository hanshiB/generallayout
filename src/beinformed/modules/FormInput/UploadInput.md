Render an UploadInput

    const uploadConstraints = {
      fileTypes: [{
        extensions: ['txt'],
        mimeTypes: ['text/plain'],
      }],
      fileSize: 500000,
    };

    <UploadInput
      ariaLabel="Aria Label"
      ariaLabelledBy=""
      id="id"
      inError={false}
      isMultiple={false}
      name="name"
      placeholder="Placeholder"
      readOnly={false}
      uploadConstraints={uploadConstraints}
      onBlur={() => {}}
      onChange={() => {}}
      onFocus={() => {}}
    />