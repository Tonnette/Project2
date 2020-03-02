var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
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
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Users.associate = function(models) {
        Users.hasMany(models.Blog, {
            onDelete: "cascade"
        });
    };

    Users.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    Users.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return Users;
};