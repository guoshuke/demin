import areaList from "./areaList";
export default {
  getAddress(areaCode) {
    areaCode = areaCode + "";
    let province = "";
    let city = "";
    let county = "";
    let province_code = areaCode.slice(0, 2) + "0000";
    let city_code = areaCode.slice(0, 4) + "00";
    let county_code = areaCode;
    for (let k in areaList) {
      for (let n in areaList[k]) {
        let temp = areaList[k];
        if (province_code == n) {
          province = temp[n];
        }
        if (city_code == n) {
          city = temp[n];
        }
        if (county_code == n) {
          county = temp[n];
        }
      }
    }
    return province + city + county;
  }
};
