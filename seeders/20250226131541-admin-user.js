'use strict';
const bcrypt = require('bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10); // Hash password
    return queryInterface.bulkInsert('Users', [
      {
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin', // Assuming your model has a role field
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  // async down (queryInterface, Sequelize) {
  //   return queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {});

  //   /**
  //    * Add commands to revert seed here.
  //    *
  //    * Example:
  //    * await queryInterface.bulkDelete('People', null, {});
  //    */
  // }
};