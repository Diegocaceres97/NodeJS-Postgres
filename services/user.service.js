const boom = require('@hapi/boom');

//const pool = require('../libs/postgres.pool');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {
   /*  this.pool = pool;
    this.pool.on('error',(err)=>console.log(err)); */
  }

  async create(data) {
    const newUSer = await models.User.create(data);
    return newUSer;
  }

  async find() {
    const client = await models.User.findAll({
      include: ['customer']
    });
    return client;
  }

  async findOne(id) {
    const findUser = await models.User.findByPk(id);
    if(!findUser){
      throw boom.notFound('user not found');
    }
    return findUser;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
   const deleteUser = await this.findOne(id);
   await deleteUser.destroy();

   return {id};
  }
}

module.exports = UserService;
