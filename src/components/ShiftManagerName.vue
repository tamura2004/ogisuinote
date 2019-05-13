<template lang="pug">
  span {{ managerName }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ShiftManagerName extends Vue {
  @Prop() private userId!: string;
  @Prop() private date!: number;

  private get shift() {
    return this.$store.getters.shift(this.userId, this.date);
  }

  private get managerName() {
    return this.shift && this.$store.getters.userName(this.shift.managerId);
  }
}
</script>

<style lang="stylus" scoped>
</style>
