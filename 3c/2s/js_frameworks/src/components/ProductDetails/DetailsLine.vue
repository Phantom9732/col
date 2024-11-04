<script lang="ts" setup>
defineProps<{
  title: string
  values: string[]
}>()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.title">{{ title }}</div>
    <div :class="$style.values">
      <div v-for="val in values" :key="val" :class="$style.value">
        {{ val }}
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cdcdcd;
  padding-bottom: 0.5rem;
}
.title {
  font-family: var(--font-abel);
  font-size: 1rem;
  line-height: 1.5rem;
  color: black;
}
.values {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.value {
  font-family: var(--font-abel);
  font-size: 0.938rem;
  line-height: 1.5rem;
  color: black;
}
</style>
