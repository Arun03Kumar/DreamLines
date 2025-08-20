"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename boardinggate to boardingGate
    await queryInterface.renameColumn(
      "Flights",
      "boardinggate",
      "boardingGate"
    );
    // Change departureAirportId to STRING
    await queryInterface.changeColumn("Flights", "departureAirportId", {
      type: Sequelize.STRING,
      allowNull: false, // or true if you want to allow nulls
    });
    // Change arrivalAirportId to STRING
    await queryInterface.changeColumn("Flights", "arrivalAirportId", {
      type: Sequelize.STRING,
      allowNull: false, // or true if you want to allow nulls
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert boardingGate to boardinggate
    await queryInterface.renameColumn(
      "Flights",
      "boardingGate",
      "boardinggate"
    );
    // Revert departureAirportId to INTEGER
    await queryInterface.changeColumn("Flights", "departureAirportId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    // Revert arrivalAirportId to INTEGER
    await queryInterface.changeColumn("Flights", "arrivalAirportId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
