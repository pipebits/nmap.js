const scanner = require("../src/index");
const util = require("util");
let Client = new scanner("10.0.0.1");

Client.customScan(["-T4", "-v"]);

Client.on("raw", (output) => {
  console.log(output);
});

Client.on("json", (output) => {
  console.log(util.inspect(output, true, 10));
});

Client.on("error", (error) => {
  console.log(error);
});
