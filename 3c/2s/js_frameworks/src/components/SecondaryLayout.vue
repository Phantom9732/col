<template>
  <div :class="$style.layout">
    <slot />
  </div>
</template>

<style module>
.layout {
  max-width: 70rem;
  width: 100%;
  margin-inline: auto;
}
</style>
