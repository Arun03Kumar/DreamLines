"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add foreign key for airplaneId
    // await queryInterface.addConstraint("Flights", {
    //   fields: ["airplaneId"],
    //   type: "foreign key",
    //   name: "fk_flights_airplane", // custom constraint name
    //   references: {
    //     table: "Airplanes",
    //     field: "id",
    //   },
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    // });

    // Add foreign key for departureAirportId
    await queryInterface.addConstraint("Flights", {
      fields: ["departureAirportId"],
      type: "foreign key",
      name: "fk_flights_departure_airport",
      references: {
        table: "Airports",
        field: "code",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Add foreign key for arrivalAirportId
    await queryInterface.addConstraint("Flights", {
      fields: ["arrivalAirportId"],
      type: "foreign key",
      name: "fk_flights_arrival_airport",
      references: {
        table: "Airports",
        field: "code",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Flights", "fk_flights_airplane");
    await queryInterface.removeConstraint(
      "Flights",
      "fk_flights_departure_airport"
    );
    await queryInterface.removeConstraint(
      "Flights",
      "fk_flights_arrival_airport"
    );
  },
};
