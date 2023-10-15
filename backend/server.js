require("dotenv").config();
const app = require("./app");

//Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});


/**
 * instantiate server
 */
const server = app.listen(process.env.NODE_PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.NODE_PORT} in ${process.env.NODE_ENV} mode`
  );
});


//Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});