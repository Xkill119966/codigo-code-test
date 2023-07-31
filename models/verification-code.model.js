const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VerificationCode extends Model {
    static associate(models) {
      //
    }

   
  }

  VerificationCode.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      phoneNumber: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "VerificationCode",
      indexes: [{ unique: true, fields: ["phoneNumber"] }],
    }
  );
  return VerificationCode;
};
