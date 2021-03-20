const handleValidationError = (error) => {
    const result = {};
    if (
      error.response &&
      error.response.data &&
      error.response.data.message === 'ValidationFailed'
    ) {
      const fieldsInError = error.response.data.errors;
      const validationErrors = [];
      fieldsInError.forEach((fieldAndCode) => {
        const [field, code] = fieldAndCode.split('-');
        validationErrors[field] = code;
      });

      result.validationErrors = validationErrors;
    }
    let errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    result.errorMessage = errorMessage;
    return result;
};
export default handleValidationError;