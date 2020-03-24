'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // qual tabela
      'avatar_id', // qual o nome da nova coluna
      {
        type: Sequelize.INTEGER,
        // todo users.avatar_id vai ser files.id
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE', // Quando mudar o id do file vai alterar o avatar_id em users
        onDelete: 'SET NULL', //  Quando deletar o id do file vai setar como null o avatar_id em users
        allowNull: true
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  }
};
