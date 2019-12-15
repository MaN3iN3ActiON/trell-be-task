/*
  main entry file
  entry file for serving the express app
*/
/*
 * Module dependencies
 */
const path = require("path");

const mongoose = require("./db");

const { app, listen } = require("./app");

/*
 * Connect ot MongoDB then start the app
 */
mongoose.connection.once("open", () => {
  listen();
});

module.exports = app;
