import { shallowMount } from "@vue/test-utils";
import CurrencyExchange from "./CurrencyExchange.vue";

describe("CurrencyExchange", () => {
  describe("onMounted", () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockReturnValue({});
    });

    it("should mount the component", () => {
      const wrapper = shallowMount(CurrencyExchange);

      expect(wrapper.get("h1").text()).toBe("Currency exchange");
    });

    it("should fetch latest exchange rates once", () => {
      shallowMount(CurrencyExchange);

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should call exchange rates api with 'EUR' as base currency", () => {
      shallowMount(CurrencyExchange);

      expect(fetch).toHaveBeenCalledWith(
        "SET_API_URL/latest?access_key=SET_API_KEY&base=EUR",
      );
    });
  });
});
