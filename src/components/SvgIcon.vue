<template>
  <svg
      class="svg-icon"

  >
    <!--    :style="{
          width: props.size + 'px',
          height: props.size + 'px',
        }"-->
    <use :xlink:href="`#icon-${props.name}`"/>
  </svg>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
      default: "email"
    },
    // size: {
    //   type: Number,
    //   default: 32
    // },
    // color: {
    //   type: String,
    // }
  },
  setup(props) {
    return {
      props
    };
  }
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 40px;
  height: 40px;
}
</style>
