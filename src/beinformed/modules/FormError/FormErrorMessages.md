Render an error on an attribute

    const Form = require('../../models/form/FormModel').default;

    const form = new Form({});
    form.errorCollection.addError("FirstErrorId");
    form.errorCollection.addError("Constraint.Captcha.Invalid", {
       value: 'Example translated message'
    });

    <FormErrorMessages
      form={form}
      onDismiss={() => {}}
    />