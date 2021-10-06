<template>
  <div v-if="isFetchingSymbols"><Spinner /></div>
  <div v-else class="bg-purple-100 max-w-md mx-auto rounded-lg py-2 px-3">
    <h1 class="font-semibold mb-2">Currency exchange</h1>
    <div v-if="availableSymbols.length > 1" class="w-3/4 mx-auto">
      <CurrencyInput
        label="Sell"
        class="mb-2"
        :currencies="[baseCurrency]"
        @change="setFromCurrency"
      />
      <CurrencyInput
        label="Buy"
        class="mb-2"
        :currencies="availableSymbols"
        :readonly-value="exchangeAmount.toFixed(2)"
        @change="setToCurrency"
        readonly
      />
      <p class="text-gray-600 text-sm" v-if="exchangeRate > 0">
        (Exchange rate: {{ exchangeRate }})
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  ILatestExchangeRatesResponse,
  ISymbolsResponse,
} from "src/core/interfaces";
import {
  VITE_EXCHANGE_RATES_API_KEY,
  VITE_EXCHANGE_RATES_API_URL,
} from "src/core/ApiConfig";
import CurrencyInput from "src/components/CurrencyInput.vue";
import Spinner from "src/components/Spinner.vue";

const baseCurrency = "EUR";

const isFetchingSymbols = ref(false);
const symbolsResponse = ref<ISymbolsResponse>();
const latestExchangeRatesResponse = ref<ILatestExchangeRatesResponse>();

const fromCurrency = ref({ amount: 0, currency: "" });
const toCurrencySymbol = ref("");

const availableSymbols = computed(() => {
  if (!symbolsResponse.value?.symbols) {
    return [];
  }

  return Object.keys(symbolsResponse.value?.symbols);
});

const exchangeRate = computed(() => {
  const latestExchangeRate =
    latestExchangeRatesResponse.value?.rates[toCurrencySymbol.value];
  return latestExchangeRate ? latestExchangeRate : 0;
});

const exchangeAmount = computed(() => {
  if (!exchangeRate.value) {
    return 0;
  }

  return exchangeRate.value * fromCurrency.value.amount;
});

onMounted(async () => {
  isFetchingSymbols.value = true;
  await fetchSymbols();
  isFetchingSymbols.value = false;
  await fetchLatestEurExchangeRates();
});

const fetchSymbols = async () => {
  const resp = await fetch(
    `${VITE_EXCHANGE_RATES_API_URL}/symbols?access_key=${VITE_EXCHANGE_RATES_API_KEY}`,
  );

  if (!resp.ok) {
    return;
  }

  symbolsResponse.value = await resp.json();
};

const fetchLatestEurExchangeRates = async () => {
  const resp = await fetch(
    `${VITE_EXCHANGE_RATES_API_URL}/latest?access_key=${VITE_EXCHANGE_RATES_API_KEY}`,
  );

  if (!resp.ok) {
    return;
  }

  latestExchangeRatesResponse.value = await resp.json();
};

const setFromCurrency = ([amount, currency]: [number, string]) => {
  fromCurrency.value = { amount, currency };
};

const setToCurrency = ([_, currency]: [number, string]) => {
  toCurrencySymbol.value = currency;
};
</script>
