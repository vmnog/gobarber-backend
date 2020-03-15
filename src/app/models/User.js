import Sequelize, { Model } from 'sequelize';

class User extends Model {
  // Método obrigatório que chama a função init() da Classe pai (Model)
  static init(sequelize) {
    super.init(
      {
        // Colunas que nao são pk / fk
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hase: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );
  }
}

export default User;
