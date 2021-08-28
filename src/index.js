const EventEmitter = require("events");
const { exec } = require("child_process");
var { parseString } = require("xml2js");

/**
 * The main client of nmap-node.
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
  /**
   * @param {String} [target] Options for the client
   */
  constructor(target = "127.0.0.1") {
    super();
    this.target = target;
  }

  intenseScan() {
    this.customScan(["-T4", "-A", "-v", "-oX -"]);
  }
  intenseScanPlusUDP() {
    this.customScan(["-Ss", "-sU", "-T4", "-A", "-v"]);
  }
  intenseScanAllTCP() {
    this.customScan(["-P 1-65535", "-T4", "-A", "-v"]);
  }
  intenseScanNoPing() {
    this.customScan(["-Pn", "-T4", "-A", "-v"]);
  }
  pingScan() {
    this.customScan(["-sn"]);
  }
  quickScan() {
    this.customScan(["-T4", "-F"]);
  }
  quickScanPlus() {
    this.customScan(["-sV", "-T4", "-O", "-F", "--version-light"]);
  }
  quickTraceroute() {
    this.customScan(["-sn", "--traceroute"]);
  }
  regularScan() {
    this.customScan();
  }
  slowScan() {
    this.customScan([
      "-sS",
      "-sU",
      "-T4",
      "-A",
      "-v",
      "-PE",
      "-PP",
      "-PS80,443",
      "-PA3389",
      "-PU40125",
      "-PY",
      "-g 53",
      '--script "default or (discovery and safe)"',
    ]);
  }
  /**
   * Custom scan for adding custom options
   * @param {Array<string>} options
   */
  customScan(options = []) {
    exec(
      `nmap ${options && `${options.join(" ")} `}${this.target}`,
      (error, stdout, stderr) => {
        if (error || stderr) return this.emit("error", error || stderr);

        this.emit("raw", stdout);
      }
    );
  }
}

module.exports = Client;
