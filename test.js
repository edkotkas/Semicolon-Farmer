const farmer = require('./app')

farmer()
  .then(result => console.log(result))
  .catch(error => console.log(error))

