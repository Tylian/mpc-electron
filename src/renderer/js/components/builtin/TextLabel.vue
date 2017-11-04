<template>
  <div class="text-label">{{ config.text }}</div>
</template>

<script>
export default {
  name: 'text-label',
  props: ['config']
}
</script>

<style scoped>
  .text-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
</style>