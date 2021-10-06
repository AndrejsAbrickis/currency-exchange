<template>
  <div class="bg-white rounded">
    <p class="text-left text-sm py-1 px-2">{{ label }}</p>
    <div class="flex">
      <p v-if="readonly" class="flex-grow px-2 text-left">
        {{ readonlyValue }}
      </p>
      <input
        v-else
        type="number"
        @input="validateAmount"
        v-model="amount"
        class="flex-grow px-2"
      />
      <label for="selector" class="w-20">
        <select
          id="selector"
          v-model="currency"
          @change="emitChange"
          class="w-full p-1"
        >
          <option
            v-for="currencyOption in currencies"
            :key="currencyOption"
            :value="currencyOption"
            :selected="currencyOption === currency"
          >
            {{ currencyOption }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
const EVENTS = {
  CHANGE: "change",
};
</script>

<script setup lang="ts">
import { onMounted, ref } from "vue";

interface ComponentProps {
  label: string;
  currencies: string[];
  readonly?: boolean;
  readonlyValue?: string;
}
const props = defineProps<ComponentProps>();

const emit = defineEmits([EVENTS.CHANGE]);

const amount = ref(1);
const currency = ref(props.currencies[0]);

onMounted(() => {
  emitChange();
});

const validateAmount = () => {
  if (amount.value < 0) {
    amount.value = 0;
  }

  if ((amount.value * 100) % 1 > 0) {
    amount.value = Math.trunc(amount.value * 100) / 100;
  }

  emitChange();
};

const emitChange = () => {
  emit(EVENTS.CHANGE, [amount.value, currency.value]);
};
</script>
