import * as moment from "moment";

function writeCookie(key: string, data: any) {
  const expirationDate = moment().add(1, "year").toString();
  const serializedData = JSON.stringify(data);
  document.cookie = `${key}=${serializedData}; expires=${expirationDate};`;
}

function readCookie<T>(key: string): T | undefined {
  const allCookieString = document.cookie;
  const cookies: string[] = allCookieString.split(";");

  for (let i = 0; i <= cookies.length - 1; i++) {
    let cookie = cookies[i];
    cookie = cookie.trim();
    if (cookie.split("=")[0] === key) {
      let cookieValue = cookie.split("=")[1];
      try {
        return JSON.parse(cookieValue) as T;
      } catch (e) {
        return undefined;
      }
    }
  }
  return undefined;
}

function clearCookie(key: string) {
  document.cookie = `${key}=`;
}

export const CookieAdapter = {
  writeCookie,
  readCookie,
  clearCookie
};
