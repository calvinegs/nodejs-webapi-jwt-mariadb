module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "mariadb@12345",
    DB: "testdb",
    dialect: "mariadb",
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
}