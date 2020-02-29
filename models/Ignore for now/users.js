// module.exports = function(sequelize, DataTypes) {
//     var Users = sequelize.define("Users", {
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 len: [1, 20]
//             }
//         },
//         // email: {
//         //     type: DataTypes.STRING,
//         //     allowNull: false,
//         //     unique: true,
//         //     validate: {
//         //         isEmail: true
//         //     }
//         // },
//         // password: {
//         //     type: DataTypes.STRING,
//         //     allowNull: false
//         // }
//     });

//     Users.associate = function(models) {
//         Users.hasMany(models.Comments, {
//             foreignKey: {
//                 allowNull: false
//             }
//         });
//     };

//     return Users;
// };