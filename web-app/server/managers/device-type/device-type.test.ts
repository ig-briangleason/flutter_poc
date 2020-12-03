import { expect } from "chai";
import { inferDeviceType } from "./";

describe("The Device Type Manager", () => {
  describe(".inferDeviceType works for", () => {

    it("a normal desktop web request", () => {
      const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36";
      const result = inferDeviceType({}, userAgent);
      expect(result.experience).to.equal("WEB");
      expect(result.formFactor).to.equal("DESKTOP");
      expect(result.platform).to.equal("OTHER");
    });

    it("a normal desktop web request with the isNativeMobile flag set", () => {
      const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36";
      const result = inferDeviceType({ isNativeMobile: "true" }, userAgent);
      expect(result.experience).to.equal("NATIVE");
      expect(result.formFactor).to.equal("DESKTOP");
      expect(result.platform).to.equal("OTHER");
    });

    it("an iPhone user agent running on the web", () => {
      const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1";
      const result = inferDeviceType({}, userAgent);
      expect(result.experience).to.equal("WEB");
      expect(result.formFactor).to.equal("MOBILE");
      expect(result.platform).to.equal("IOS");
    });

    it("an iPhone user agent with the isNativeMobile flag set", () => {
      const userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1";
      const result = inferDeviceType({ isNativeMobile: "true" }, userAgent);
      expect(result.experience).to.equal("NATIVE");
      expect(result.formFactor).to.equal("MOBILE");
      expect(result.platform).to.equal("IOS");
    });

    it("an iPad user agent running on the web", () => {
      const userAgent = "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
      const result = inferDeviceType({}, userAgent);
      expect(result.experience).to.equal("WEB");
      expect(result.formFactor).to.equal("TABLET");
      expect(result.platform).to.equal("IOS");
    });

    it("an iPad user agent with the isNativeMobile flag set", () => {
      const userAgent = "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
      const result = inferDeviceType({ isNativeMobile: "true" }, userAgent);
      expect(result.experience).to.equal("NATIVE");
      expect(result.formFactor).to.equal("TABLET");
      expect(result.platform).to.equal("IOS");
    });

    it("an Galaxy S5 user agent running on the web", () => {
      const userAgent = "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Mobile Safari/537.36";
      const result = inferDeviceType({}, userAgent);
      expect(result.experience).to.equal("WEB");
      expect(result.formFactor).to.equal("MOBILE");
      expect(result.platform).to.equal("ANDROID");
    });

    it("an Galaxy S5 user agent with the isNativeMobile flag set", () => {
      const userAgent = "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Mobile Safari/537.36";
      const result = inferDeviceType({ isNativeMobile: "true" }, userAgent);
      expect(result.experience).to.equal("NATIVE");
      expect(result.formFactor).to.equal("MOBILE");
      expect(result.platform).to.equal("ANDROID");
    });

    it("an Galaxy Tab user agent running on the web", () => {
      const userAgent = "Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1";
      const result = inferDeviceType({}, userAgent);
      expect(result.experience).to.equal("WEB");
      expect(result.formFactor).to.equal("TABLET");
      expect(result.platform).to.equal("ANDROID");
    });

    it("an Galaxy Tab user agent with the isNativeMobile flag set", () => {
      const userAgent = "Mozilla/5.0 (Linux; U; Android 2.2; en-us; SCH-I800 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1";
      const result = inferDeviceType({ isNativeMobile: "true" }, userAgent);
      expect(result.experience).to.equal("NATIVE");
      expect(result.formFactor).to.equal("TABLET");
      expect(result.platform).to.equal("ANDROID");
    });
  });
});
