const handleRestApiError = (error) => {
  const result = {};
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    const fieldsInError = error.response.data.errors;
    const restApiErrors = {};
    fieldsInError.forEach((fieldAndCode) => {
      const [field, code] = fieldAndCode.split('-');
      restApiErrors[field] = code;
    });

    result.fieldsInError = restApiErrors;
  } else {
    result.fieldsInError = {};
  }
  let errorMessage =
    (error &&
      error.response &&
      error.response.data &&
      error.response.data.message) ||
    (error && error.message) ||
    (error && error.toString()) ||
    'Network error';

  result.errorMessage = errorMessage;
  return result;
};
export default handleRestApiError;
