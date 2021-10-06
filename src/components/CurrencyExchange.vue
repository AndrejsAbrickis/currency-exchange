<template>
  <h1>Currency exchange</h1>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ILatestExchangeRatesResponse } from "src/core/interfaces/ILatestExchangeRatesResponse";
import {
  VITE_EXCHANGE_RATES_API_KEY,
  VITE_EXCHANGE_RATES_API_URL,
} from "src/core/ApiConfig";

const baseCurrency = "EUR";
const latestExchangeRates = ref<ILatestExchangeRatesResponse>();

const availableCurrencies = computed(() => {
  if (!latestExchangeRates.value?.rates) {
    return [];
  }

  return Object.keys(latestExchangeRates.value?.rates);
});

onMounted(async () => {
  const resp = await fetch(
    `${VITE_EXCHANGE_RATES_API_URL}/latest?access_key=${VITE_EXCHANGE_RATES_API_KEY}&base=${baseCurrency}`,
  );

  if (!resp.ok) {
    return;
  }

  latestExchangeRates.value = await resp.json();
});
</script>
