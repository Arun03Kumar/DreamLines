"use strict";

const { Enums } = require("../utils");
const { ECONOMY } = Enums.SEATTYPE;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Example: Seed seats for airplaneId = 1, rows 1-3, cols A-F, all ECONOMY
    const seats = [];
    const now = new Date();
    const airplaneId = 1; // Change this if you want to seed for a different airplane

    for (let row = 1; row <= 3; row++) {
      for (let col of ["A", "B", "C", "D", "E", "F"]) {
        seats.push({
          airplaneId,
          row,
          col,
          seatType: ECONOMY,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
    await queryInterface.bulkInsert("Seats", seats, {});
  },

  async down(queryInterface, Sequelize) {
    const airplaneId = 1;
    const seatConditions = [];
    for (let row = 1; row <= 3; row++) {
      for (let col of ["A", "B", "C", "D", "E", "F"]) {
        seatConditions.push({ airplaneId, row, col });
      }
    }
    // Remove all seeded seats for airplaneId = 1, rows 1-3, cols A-F
    for (const cond of seatConditions) {
      await queryInterface.bulkDelete("Seats", cond, {});
    }
  },
};
