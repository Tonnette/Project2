module.exports = function(sequelize, DataTypes) {
    var Blog = sequelize.define("Blog", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        blog: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

        // created_at: {
        //   type: DataTypes.STRING,
        //   allowNull: true,
        // }
    });
    Blog.associate = function(models) {
        Blog.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Blog;
};