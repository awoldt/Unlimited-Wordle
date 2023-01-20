import DeviceDetector from "device-detector-js";

const UserDevice = new DeviceDetector();
export default function generateRepsonsiveLayout(userAgent: string) {
  //generate responsive layout numbers before sending to frontend
  const device = UserDevice.parse(userAgent).device;
  if (device!) {
    if (device.type!) {
      if (device.type == "desktop") {
        return "desktop";
      } else if (device.type == "tablet") {
        return "tablet";
      } else if (device.type == "smartphone") {
        return "phone";
      } else {
        return "unknown_device";
      }
    }
  }
}
