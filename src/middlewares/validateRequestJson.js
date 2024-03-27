function validateRequestJson(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    console.log("validate request", error);
    const errorMessage = error.details.map((x) => x.message).join(", ");
    next(`Validation error: ${errorMessage}`);
  }
  next();
}

module.exports = { validateRequestJson };
