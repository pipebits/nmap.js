# nmap node

A package to interact with nmap from code!

## Instalation

For this package to work you need [nmap](https://nmap.org) and [node](https://nodejs.org/es/) installed in your machine.

```
npm:
npm install nmap-node
```

## Usage

```js
//Import the module
const scanner = require("nmap-node");

//Create a new client and define the target
let Client = new scanner("10.0.0.1");

//Run the scan
Client.regularScan();

//On raw data print it
Client.on("raw", (output) => {
  console.log(output);
});

Client.on("error", (error) => {
  console.log(error);
});
```
