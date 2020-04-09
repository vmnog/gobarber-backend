import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  // Método obrigatório que chama a função init() da Classe pai (Model)
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          }
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          }
        }
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
