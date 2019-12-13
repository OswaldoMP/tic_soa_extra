'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItinerarioSchema extends Schema {
  up () {
    this.create('itinerarios', (table) => {

      table.string('name',50).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.date('fecha').notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('itinerarios')
  }
}

module.exports = ItinerarioSchema
