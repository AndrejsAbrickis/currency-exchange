import { shallowMount } from "@vue/test-utils";
import CurrencyExchange from "./CurrencyExchange.vue";

jest.mock("src/core/ApiConfig", () => ({
  VITE_EXCHANGE_RATES_API_URL: "MOCK_URL",
  VITE_EXCHANGE_RATES_API_KEY: "MOCK_KEY",
}));

describe("CurrencyExchange", () => {
  describe("onMounted", () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockReturnValue({});
    });

    it("should mount the component", () => {
      const wrapper = shallowMount(CurrencyExchange);

      expect(wrapper.get("h1").text()).toBe("Currency exchange");
    });

    it("should fetch currency symbols once", () => {
      shallowMount(CurrencyExchange);

      expect(fetch).toHaveBeenCalledWith(
        "MOCK_URL/symbols?access_key=MOCK_KEY",
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
