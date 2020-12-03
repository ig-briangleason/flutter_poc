const MobileDetect = require('mobile-detect');

export type Experience = "WEB" | "NATIVE";
export type FormFactor = "DESKTOP" | "TABLET" | "MOBILE";
export type Platform = "IOS" | "ANDROID" | "OTHER";

type UserDeviceType = {
  experience: Experience,
  formFactor: FormFactor,
  platform: Platform
};

function determineExperience(queryParams: { [key: string]: string }): Experience {
  if (queryParams.isNativeMobile || queryParams.isNativeiOS || queryParams.isNativeAndroid) {
    return "NATIVE";
  }
  return "WEB";
}

function determineFormFactor(userAgent: string): FormFactor {
  const md = new MobileDetect(userAgent);
  if (md.tablet()) { return "TABLET"; }
  if (md.mobile()) { return "MOBILE"; }
  return "DESKTOP";
}

function determinePlatform(userAgent: string): Platform {
  const md = new MobileDetect(userAgent);
  if (md.os() === "iOS") { return "IOS"; }
  if (md.os() === "AndroidOS") { return "ANDROID"; }
  return "OTHER";
}

export function inferDeviceType(queryParams: { [key: string]: string }, userAgent: string): UserDeviceType {
  return {
    experience: determineExperience(queryParams),
    formFactor: determineFormFactor(userAgent),
    platform: determinePlatform(userAgent)
  };
}
