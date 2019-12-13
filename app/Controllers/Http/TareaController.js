'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tareas
 */

const Tarea = use('App/Models/Tarea')

class TareaController {
  /**
   * Show a list of all tareas.
   * GET tareas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const tarea = Tarea.all()
    
    return tarea

  }

  /**
   * Render a form to be used for creating a new tarea.
   * GET tareas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new tarea.
   * POST tareas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const tarea = new Tarea();
    const data = request.all()

    tarea.description = data.description;
    tarea.itinerario_id = data.itinerario_id;
    await tarea.save()

  }

  /**
   * Display a single tarea.
   * GET tareas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const tarea = await Tarea.findBy('id',params.id);
      if(tarea){
        return tarea;
        // console.log('existe')
      }
      return response.send({message:{error:'User no Existe'}})
    } catch (error) {
      return response.send(error)
    }

  }

  /**
   * Render a form to update an existing tarea.
   * GET tareas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tarea details.
   * PUT or PATCH tareas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try {
      const data = request.all()
      const tarea = await Tarea.findBy('id',params.id)//verificar si el usuario ya existe
      const testIn = await tarea.itinerario().fetch()
      console.log(tarea)
      testIn.name = data.name
      testIn.fecha = data.fecha
      await testIn.save()
      if(tarea){
        tarea.merge(data)
        await tarea.save()
        // tarea = await tarea.create(data)//Usuario creado
        // return response.status(201).send({message:{status:'SUCCESSFUL'}}).json(tarea);
        return tarea;
      }
      return response.send({message:{erro:'tarea  no Existente'}})
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Delete a tarea with id.
   * DELETE tareas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const tarea = await Tarea.findBy('id',params.id)
    if(tarea){
      await tarea.delete()
      return tarea
    }
    return response.send({message:{status:'No successful'}})
  }
}

module.exports = TareaController
