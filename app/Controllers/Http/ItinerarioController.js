'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with itinerarios
 */

const Itinerario = use('App/Models/Itinerario')
const User = use('App/Models/User')
const Tarea = use('App/Models/Tarea')

class ItinerarioController {
  /**
   * Show a list of all itinerarios.
   * GET itinerarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const itinerario = Itinerario.all();

    return itinerario
  }

  /**
   * Render a form to be used for creating a new itinerario.
   * GET itinerarios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new itinerario.
   * POST itinerarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const user = new User();
    const itinerario = new Itinerario();
    const data = request.all()

    itinerario.name = data.name;
    itinerario.fecha = data.fecha;
    itinerario.user_id = data.user_id;
    await itinerario.save()

  }

  /**
   * Display a single itinerario.
   * GET itinerarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const itinerario = await Itinerario.findBy('id',params.id)
    if(itinerario){
      const itinerarioList = await itinerario.tareas().fetch()
      return itinerarioList
    }
    return response.send({message:{status:'No successful'}})


    // const user = await User.findBy('id', params.id)
    // const listas = await user.listas().fetch()
    // return listas

  }

  /**
   * Render a form to update an existing itinerario.
   * GET itinerarios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update itinerario details.
   * PUT or PATCH itinerarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try {
      const data = request.all()
      const itinerario = await Itinerario.findBy('id',params.id)//verificar si el usuario ya existe
      if(itinerario){
        itinerario.merge(data)
        await itinerario.save()
        // itinerario = await Itinerario.create(data)//Usuario creado
        // return response.status(201).send({message:{status:'SUCCESSFUL'}}).json(itinerario);
        return itinerario;
      }
      return response.send({message:{erro:'Itinerario  no Existente'}})
    } catch (error) {
      return response.send(error)
    }

  }

  /**
   * Delete a itinerario with id.
   * DELETE itinerarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const itinerario = await Itinerario.findBy('id',params.id)
      if(itinerario){
        await itinerario.delete()
        return itinerario
      }
      return response.send({message:{status:'No successful'}})

      
  }
}

module.exports = ItinerarioController
