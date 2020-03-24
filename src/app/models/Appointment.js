import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  // Método obrigatório que chama a função init() da Classe pai (Model)
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE
        // nao precisa colocar as colunas que referenciam outras tabelas pois sao geradas automaticamente quando fazemos o associate
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id', // o campo user_id é do Model User
      as: 'user' // chamaremos como user este valor na response
    });
    this.belongsTo(models.User, {
      foreignKey: 'provider_id',
      as: 'provider'
    });
  }
}

export default Appointment;
