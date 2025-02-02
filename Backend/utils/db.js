const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);


// Function to initialize models and define associations
const initModels = () => {
    // Import models and store them in the models object
    const models = {};
    models.User = require("../models/User")(sequelize);
    models.Train = require("../models/Train")(sequelize);
    models.Booking = require("../models/Booking")(sequelize);
  
    // Setup associations by calling each model's associate method
    Object.keys(models).forEach(modelName => {
      if (typeof models[modelName].associate === "function") {
        models[modelName].associate(models);
      }
    });

    sequelize.models = models;
    return models;
  };

// Function to connect to the database and sync models
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected...");

        // Initialize models so they get registered in Sequelize
        initModels();

        // Synchronize the models with the database
        await sequelize.sync({ alter: true });
        console.log("Models synchronized.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

// Export the sequelize instance, models, and the connection function
module.exports = { sequelize, connectDB, initModels };