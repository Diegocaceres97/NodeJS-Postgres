const boom = require('@hapi/boom');

//const pool = require('../libs/postgres.pool');

const { models } = require('./../libs/sequelize');

class CustomerService {
  constructor() {
   /*  this.pool = pool;
    this.pool.on('error',(err)=>console.log(err)); */
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async find() {
    const client = await models.Customer.findAll();
    return client;
  }

  async findOne(id) {
    const findCustomer = await models.Customer.findByPk(id);
    if(!findCustomer){
      throw boom.notFound('Customer not found');
    }
    return findCustomer;
  }

  async update(id, changes) {
    const Customer = await this.findOne(id);
    const rta = await Customer.update(changes);
    return rta;
  }

  async delete(id) {
   const deleteCustomer = await this.findOne(id);
   await deleteCustomer.destroy();

   return {id};
  }
}

module.exports = CustomerService;
