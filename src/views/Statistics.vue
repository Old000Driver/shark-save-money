<template>
  <Layout>
    <top-nav/>
    <list-block/>
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import TopNav from "@/components/Statistics/topNav.vue";
import ListBlock from "@/components/Statistics/listBlock.vue";

export default Vue.extend({
  name: 'Statistics',
  components: {
    ListBlock,
    TopNav,
  },
  data() {
    return {

    }
  },

  methods: {

  },
  beforeCreate() {
    this.$store.commit('getRecords')
  },



});
</script>

<style lang="scss" scoped>


</style>