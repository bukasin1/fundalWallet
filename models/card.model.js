module.exports = (sequelize, DataTypes) => {

    const Card = sequelize.define("card", {

        user: {

            type: DataTypes.STRING

        },

        name: {

            type: DataTypes.STRING

        },

        delivered: {
            type: DataTypes.BOOLEAN
        }

    });


    return Card;

};