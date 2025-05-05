module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define("Log", {
      user_id: DataTypes.INTEGER,
      action: DataTypes.STRING,
      timestamp: DataTypes.DATE,
      description: DataTypes.STRING
    });
  
    Log.associate = (models) => {
      Log.belongsTo(models.User, { foreignKey: 'user_id' });
    };
  
    return Log;
  };