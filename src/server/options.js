module.exports = {
  schemas: {
    products: {
      properties: {
        name: {
          type: 'string',
          minLength: 6
        },
        price: {
          type: 'integer',
          minimum: 0
        }
      },
      required: ['name']
    }
  }
}