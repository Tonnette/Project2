module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("Movies", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }

        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        rating: {
            type: DataTypes.INT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });

    Comments.associate = function(models) {
        Comments.belongsTo(models.Users, {
            onDelete: "cascade"
        });
    };

    return Comments;
};