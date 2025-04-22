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
      User.hasMany(models.AppointmentRequest, { foreignKey: 'user_id' });
      User.hasMany(models.Photo, { foreignKey: 'user_id' });
      User.hasMany(models.Comment, { foreignKey: 'user_id' });
      User.hasMany(models.Log, { foreignKey: 'user_id' });
    };
  
    return User;
  };