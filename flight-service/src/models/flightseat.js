"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FlightSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Flight, { foreignKey: "flightId" });
      this.belongsTo(models.Seat, { foreignKey: "seatId" });
    }
  }
  FlightSeat.init(
    {
      flightId: { type: DataTypes.INTEGER, allowNull: false },
      seatId: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM("AVAILABLE", "BLOCKED", "BOOKED"),
        allowNull: false,
        defaultValue: "AVAILABLE",
      },
      bookingId: { type: DataTypes.INTEGER, allowNull: true },
      holdExpiresAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: "FlightSeat",
      tableName: "FlightSeats",
      indexes: [{ unique: true, fields: ["flightId", "seatId"] }],
    }
  );
  return FlightSeat;
};
