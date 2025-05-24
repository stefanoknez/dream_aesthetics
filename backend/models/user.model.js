module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "USER", "CLINIC_ADMIN"),
      allowNull: false,
      defaultValue: "USER",
    },
  });

  User.associate = (models) => {
    User.hasMany(models.AppointmentRequest, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });

    User.hasMany(models.Photo, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });

    User.hasMany(models.Comment, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });

    User.hasMany(models.Log, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  };

  return User;
};