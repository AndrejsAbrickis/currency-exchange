import { shallowMount } from "@vue/test-utils";
import CurrencyInput from "./CurrencyInput.vue";

describe("CurrencyInput", () => {
  let props = {};

  beforeEach(() => {
    props = {
      label: "test",
      currencies: ["EUR", "GBP", "USD"],
    };
  });
  it("should render as many options as provided currency symbols", () => {
    const wrapper = shallowMount(CurrencyInput, {
      props,
    });

    expect(wrapper.findAll("option").length).toBe(3);
  });

  it("should emit change event after component is mounted", () => {
    const wrapper = shallowMount(CurrencyInput, {
      props,
    });

    expect(wrapper.emitted()).toStrictEqual({ change: [[[1, "EUR"]]] });
  });

  it("should validate amount to have maximum 2 decimals", async () => {
    const wrapper = shallowMount(CurrencyInput, {
      props,
    });

    const input = wrapper.find("input");
    await input.setValue(123.45678);

    expect(input.element.value).toBe("123.45");
  });

  it("should not allow enter amount less than 0", async () => {
    const wrapper = shallowMount(CurrencyInput, {
      props,
    });

    const input = wrapper.find("input");
    await input.setValue(-123.45678);

    expect(input.element.value).toBe("0");
  });
});
