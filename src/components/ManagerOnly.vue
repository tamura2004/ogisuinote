<template lang="pug">
span
  template(v-if="manager")
    slot
  template(v-else)
    slot(name="else")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import * as ACTION from '@/types/ActionTypes';

@Component
export default class ManagerOnly extends Vue {
  private get manager() {
    return this.$store.getters.currentUser && this.$store.getters.currentUser.manager;
  }
}
</script>

<style lang="stylus" scoped>
</style>
