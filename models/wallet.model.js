module.exports = (sequelize, DataTypes) => {

    const Wallet = sequelize.define("wallet", {

        user: {

            type: DataTypes.STRING

        },

        balance: {

            type: DataTypes.INTEGER

        },

        income: {
            type: DataTypes.INTEGER
        },

        expense: {
            type: DataTypes.INTEGER
        }

    });


    return Wallet;

};