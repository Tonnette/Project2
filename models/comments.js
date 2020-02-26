module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("Movies", {
        // Giving the Author model a name of type STRING
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
        }
    });

    Comments.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Comments.belongsTo(models.Users, {
            onDelete: "cascade"
        });
    };

    return Comments;
};