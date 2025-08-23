"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FlightSeats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Flights", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      seatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Seats", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("AVAILABLE", "BLOCKED", "BOOKED"),
        allowNull: false,
        defaultValue: "AVAILABLE",
      },
      bookingId: { type: Sequelize.INTEGER, allowNull: true },
      holdExpiresAt: { type: Sequelize.DATE, allowNull: true },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("FlightSeats", {
      fields: ["flightId", "seatId"],
      type: "unique",
      name: "uniq_flight_seat",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FlightSeats");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_FlightSeats_status";'
    );
  },
};
