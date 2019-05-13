<template lang="pug">
  span {{ managerName }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class OverworkManagerName extends Vue {
  @Prop() private userId!: string;
  @Prop() private date!: number;

  private get overwork() {
    return this.$store.getters.overwork(this.userId, this.date);
  }

  private get managerName() {
    return this.overwork && this.$store.getters.userName(this.overwork.managerId);
  }
}
</script>

<style lang="stylus" scoped>
</style>
