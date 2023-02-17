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

$height: 100vh;
$NavHeight: 70px;

.wrapper {
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;


}

.content {
  width: 100vw;
  height: calc(#{$height} - #{$NavHeight});
}


</style>