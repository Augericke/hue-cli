import axios from "axios";
import config from "../utils/conf";

// @ts-ignore
import mdns from "node-dns-sd";

interface HueMdnsResponse {
  address: string;
  fqdn: string;
  modelName: string;
  // ...
}

interface HueDiscoveryResponse {
  id: string;
  internalipaddress: string;
  port: number;
}

// Discover the ip address of bridge connected to network (takes the first bridge if multiple found)
const setInternalAddress = async () => {
  // Check if already stored locally
  if (config.get("internalIpAddress")) {
    return;
  }

  // Find Bridge via mDNS
  try {
    const localBridges = (await mdns.discover({
      name: "_hue._tcp.local",
    })) as HueMdnsResponse[];

    return config.set("internalIpAddress", localBridges[0].address);
  } catch (error) {
    console.log("Could not find bridge via mdns... trying discovery endpoint");
  }

  // Find Bridge via Discovery
  try {
    const request = await axios.get<HueDiscoveryResponse[]>(
      "https://discovery.meethue.com/",
    );
    const data = request.data;
    return config.set("internalIpAddress", data[0].internalipaddress);
  } catch (error) {
    console.error(
      "Could not find bridge via discovery endpoint. Make sure you are on the same network as your bridge and try again.",
    );
    return;
  }
};

export default setInternalAddress;
