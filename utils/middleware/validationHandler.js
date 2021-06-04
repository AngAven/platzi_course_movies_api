// Capa de validación de datos

function validate() {
  return false
}

function validationHandler(schema, check = 'body') {
  return function(req, resp, next) {
    const error = validate(req[check], schema)

    error ? next(new Error(error)) : next()
  }
}

module.exports = validationHandler
