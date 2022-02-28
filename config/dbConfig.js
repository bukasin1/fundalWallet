module.exports = {

    HOST: "db4free.net",

    USER: "bukasin1",

    PASSWORD: "bukasin1",

    DB: "fundalwallet",

    dialect: "mysql",

    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};