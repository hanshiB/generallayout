Render a list of errors

    const ErrorCollection = require('../../models/error/ErrorCollection').default;
    
    const errorCollection = new ErrorCollection();
    errorCollection.addError("FirstErrorId");
    errorCollection.addError("Constraint.Captcha.Invalid", {
      value: 'Example translated message'
    });

    <FormErrorList
      errorCollection={errorCollection}
    />