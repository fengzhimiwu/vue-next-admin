<template>
  <div class="group-wrapper">
    <div class="banner-wrapper">
      <div class="line-tag"></div>
      <span class="banner-text">{{title}}</span>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ax-group",
  props: {
    title: {
      type: String,
      default: "-"
    }
  }
});
</script>
<style lang="scss">
@import "../../../../../assets/css/global.scss";
.group-wrapper {
  margin: 6px 0px;
}
.banner-wrapper {
  position: relative;
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.line-tag {
  width: 5px;
  height: 20px;
  background: $primary-color;
}
.banner-text {
  margin-left: 8px;
  font-size: 18px;
}
</style>