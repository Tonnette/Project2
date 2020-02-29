module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("Comments", {
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
        // date: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        // }
    });

    Comments.associate = function(models) {
        Comments.belongsTo(models.Users, {
            onDelete: "cascade"
        });
    };

    return Comments;
};