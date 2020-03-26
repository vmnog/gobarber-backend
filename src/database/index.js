import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      // faz a conexao de todos os models cadastrados
      .map(model => model.init(this.connection))
      // caso o model tenha uma tabela relacionada ele vai fazer a associacao dos fks
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      // se nao tiver usuario e senha nesse banco de dados pode passar direto a porta / nome da base de dados (se nao existir o mongo cria sozinho)
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true
      }
    );
  }
}

export default new Database();
