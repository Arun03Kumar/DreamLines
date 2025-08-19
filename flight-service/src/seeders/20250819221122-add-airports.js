"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Airports",
      [
        {
          name: "Indira Gandhi International Airport",
          code: "DEL",
          cityId: 1, // Delhi
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chhatrapati Shivaji Maharaj International Airport",
          code: "BOM",
          cityId: 2, // Mumbai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kempegowda International Airport",
          code: "BLR",
          cityId: 3, // Bengaluru
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chennai International Airport",
          code: "MAA",
          cityId: 4, // Chennai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Netaji Subhas Chandra Bose International Airport",
          code: "CCU",
          cityId: 5, // Kolkata
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Airports",
      {
        code: ["DEL", "BOM", "BLR", "MAA", "CCU"],
      },
      {}
    );
  },
};
