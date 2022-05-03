'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //tao fake data to db table
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',//hash pass
      firstName: 'Jayce',
      lastName: 'NAM',
      address: 'Vinh NA',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
