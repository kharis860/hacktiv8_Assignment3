"use strict";

const data = [
  {
    title: "photo 1",
    caption: "caption photo 1",
    image_url: "https://picsum.photos/seed/picsum/200/300",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "photo 2",
    caption: "caption photo 2",
    image_url: "https://picsum.photos/200/300?grayscale",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Photos", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Photos", null, {});
  },
};
