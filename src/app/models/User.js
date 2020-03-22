import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // Método obrigatório que chama a função init() da Classe pai (Model)
  static init(sequelize) {
    super.init(
      {
        // Campos que o usuario poderá preencher quando dar um User.Create
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // campo que existe somente no codigo
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );
    // antes do usuario ser salvo no banco de dados ele vai executar isso
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  // method to compare if password given is equal to the user password
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
