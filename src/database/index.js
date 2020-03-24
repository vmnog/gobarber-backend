import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      // faz a conexao de todos os models cadastrados
      .map(model => model.init(this.connection))
      // caso o model tenha uma tabela relacionada ele vai fazer a associacao dos fks
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
