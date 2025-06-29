module.exports = (sequelize, DataTypes) => {
  const SupportMessage = sequelize.define("SupportMessage", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    reply: {
      type: DataTypes.TEXT,
      allowNull: true
    }

  }, {
    timestamps: false
  });

  return SupportMessage;
};