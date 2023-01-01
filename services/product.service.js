const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize')
const sequelize = require('../libs/sequelize');
const setupModels = require('../db/models');
const { query } = require('express');

class ProductsService {

  constructor(){
    //this.products = [];
    this.generate();
   /*  this.pool = pool;
    this.pool.on('error',(err)=>console.log(err)); */
  }

  generate() {
   /*  const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    } */
  }

  async create(data) {
   /*  const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct); */
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }

    const { limit, offset, price } = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    if( price) {
      options.where.price = price;
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
