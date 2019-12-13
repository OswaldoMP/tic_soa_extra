'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TareaSchema extends Schema {
  up () {
    this.create('tareas', (table) => {

      table.string('description',50).notNullable()
      table.integer('itinerario_id').unsigned().references('id').inTable('itinerarios')

      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('tareas')
  }
}

module.exports = TareaSchema
