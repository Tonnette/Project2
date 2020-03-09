var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Oops. Looks like you already have an account with this email address. Please try to login.",
        fields: [sequelize.fn("lower", sequelize.col("email"))]
      },
      validate: {
        isEmail: {
          args: true,
          msg: "The email you entered is invalid or is already in our system."

        },
        max: {
          args: 254,
          msg: "The email you entered is invalid or longer than 254 characters."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Users.associate = function (models) {
    Users.hasMany(models.Blog, {
      onDelete: "cascade"
    });
  };

  Users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Users.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return Users;
};
