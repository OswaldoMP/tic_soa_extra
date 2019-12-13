'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tarea extends Model {

    itinerario () {
        return this.belongsTo('App/Models/Itinerario')
      }


}

module.exports = Tarea
