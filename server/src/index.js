const { dbPort } = require("../config/db.config");
const app = require("./app");

app.listen(dbPort || 3000, "0.0.0.0");
console.log("server on port", dbPort);
