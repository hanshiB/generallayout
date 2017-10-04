Render a FormAssistant

    const messages = [
      {
        type: 'info',
        message: 'Information message',
      },
      {
        type: 'constraint',
        message: 'Constraint message',
        inError: false,
      },
      {
        type: 'constraint',
        message: 'Constraint message in error',
        inError: true,
      },
    ];

    <FormAssistant
      hasValue={true}
      messages={messages}
    />