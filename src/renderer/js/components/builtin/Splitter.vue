<template>
  <div :class="['splitter', type]">
    <component
      v-for="(item, index) of config.layout" :key="index"
      :is="item.component"
      :class="['item', { 'fixed': item.size != undefined }]"
      :style="{
        backgroundColor: item.color,
        color: item['text-color'],
        flexBasis: item.size,
      }"
      :config="item"></component>
  </div>
</template>

<script>
export default {
  name: 'splitter',
  props: ['config'],
  computed: {
    type() {
      return this.config.vertical == true ? "vertical" : "horizontal"
    }
  }
}
</script>

<style lang="scss" scoped>
  .splitter {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;

    &.horizontal {
      flex-flow: row nowrap;
    }

    &.vertical {
      flex-flow: column nowrap;
    }

    > .item {
      flex: 1 1 auto;
      &.fixed {
        flex-grow: 0;
        flex-shrink: 0;
      }
    }
  }
</style>
