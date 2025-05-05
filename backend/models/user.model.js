module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM("ADMIN", "USER", "CLINIC_ADMIN"),
        defaultValue: "USER"
      }
    });
  
    User.associate = (models) => {
      // User.hasMany(models.appointmentrequest, { foreignKey: 'user_id' });
      // User.hasMany(models.photo, { foreignKey: 'user_id' });
      // User.hasMany(models.comment, { foreignKey: 'user_id' });
      // User.hasMany(models.log, { foreignKey: 'user_id' });
    };
  
    return User;
  };