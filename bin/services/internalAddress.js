"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const conf_1 = __importDefault(require("../utils/conf"));
// @ts-ignore
const node_dns_sd_1 = __importDefault(require("node-dns-sd"));
// Discover the ip address of bridge connected to network (takes the first bridge if multiple found)
const setInternalAddress = async () => {
    // Check if already stored locally
    if (conf_1.default.get("internalIpAddress")) {
        return;
    }
    // Find Bridge via mDNS
    try {
        const localBridges = (await node_dns_sd_1.default.discover({
            name: "_hue._tcp.local",
        }));
        return conf_1.default.set("internalIpAddress", localBridges[0].address);
    }
    catch (error) {
        console.log("Could not find bridge via mdns... trying discovery endpoint");
    }
    // Find Bridge via Discovery
    try {
        const request = await axios_1.default.get("https://discovery.meethue.com/");
        const data = request.data;
        return conf_1.default.set("internalIpAddress", data[0].internalipaddress);
    }
    catch (error) {
        console.error("Could not find bridge via discovery endpoint. Make sure you are on the same network as your bridge and try again.");
        return;
    }
};
exports.default = setInternalAddress;
//# sourceMappingURL=internalAddress.js.map