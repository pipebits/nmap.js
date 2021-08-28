const scanner = require("./src/index");
let Client = new scanner("10.0.0.1");

Client.intenseScan();

Client.on("raw", (output) => {
  console.log(output);
});

Client.on("json", (output) => {
  console.log(output);
});

Client.on("error", (error) => {
  console.log(error);
});
