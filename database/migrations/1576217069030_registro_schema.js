'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RegistroSchema extends Schema {
  up () {
    this.create('registros', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('registros')
  }
}

module.exports = RegistroSchema
