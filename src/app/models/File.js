import Sequelize, { Model } from 'sequelize';

class File extends Model {
  // Método obrigatório que chama a função init() da Classe pai (Model)
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
          }
        }
      },
      {
        sequelize
      }
    );

    return this;
  }
}

export default File;