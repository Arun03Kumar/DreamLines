"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils");

const { BUSINESS, ECONOMY, FIRST_CLASS, PREMIUM_ECONOMY } = Enums.SEATTYPE;

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
      });
      this.hasMany(models.FlightSeat, { foreignKey: "seatId" });
    }
  }
  Seat.init(
    {
      airplaneId: { type: DataTypes.INTEGER, allowNull: false },
      row: { type: DataTypes.INTEGER, allowNull: false },
      col: { type: DataTypes.STRING, allowNull: false },
      seatType: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [ECONOMY, BUSINESS, FIRST_CLASS, PREMIUM_ECONOMY],
        defaultValue: ECONOMY,
      },
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
