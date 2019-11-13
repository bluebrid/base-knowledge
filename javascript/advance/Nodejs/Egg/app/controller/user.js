'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async findAll() {
    this.ctx.body = await this.service.user.findAll();
  }
  async findOne() {
    this.ctx.body = this.ctx.request.url;
  }
  async add() {
    this.ctx.body = this.ctx.request.url;
  }
  async update() {
    this.ctx.body = this.ctx.request.url;
  }
  async delete() {
    this.ctx.body = this.ctx.request.url;
  }
}

module.exports = UserController;
