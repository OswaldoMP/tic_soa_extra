'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */

const User = use('App/Models/User')
 
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const user = User.all();
    return user
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const data = request.all()
      const userExists = await User.findBy('email',data.email)//verificar si el usuario ya existe
      if(userExists){
        return response.send({message:{erro:'User Existente'}})
      }
      const newuserExists = await User.create(data)//Usuario creado
      
      return response.status(201).send({message:{status:'SUCCESSFUL'}});
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const userExists = await User.findBy('id',params.id);
      if(userExists){
        const userItinerario = userExists.itinerarios().fetch()
        return userItinerario;
        // console.log('existe')
      }
      return response.send({message:{error:'User no Existe'}})
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   *     // const user = await User.findBy('id', params.id)
    // const listas = await user.listas().fetch()
    // return listas
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }


  async login({request,response,auth }){
    const data = request.all();
    const user = await User.findBy('email', data.email)
    const token = await auth.attempt(data.email,data.password);
    if(user){
      user.token_nav = data.token_nav;
      await user.save()
      // return response.send({user, status: 202, login})
      return response.status(202).send({user: user, Token: token});
    }
    return response.send({message:{error:'This user does not exist! or your password is incorrect, please try again.', status: 203}})
  }


}

module.exports = UserController
