<template>
  <div class="wrapper">
    <div class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'Layout',
  components: {Nav},
});
</script>

<style lang="scss" scoped>
body {
  min-height: 100vh;
}

.wrapper {
  overflow: hidden;
  min-height: 100vh;
  //border: 1px solid green;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > .content {
    width: 100vw;
    flex-grow: 1;
  }
}


</style>