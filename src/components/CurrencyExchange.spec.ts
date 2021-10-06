import { shallowMount } from '@vue/test-utils';
import CurrencyExchange from './CurrencyExchange.vue';

describe('CurrencyExchange', ()=> {
  it('should mount the component', () => {
    const wrapper = shallowMount(CurrencyExchange);

    expect(wrapper.get("h1").text()).toBe("Currency exchange");
  })
})