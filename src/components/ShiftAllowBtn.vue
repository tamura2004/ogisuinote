<template lang="pug">
  v-btn.ma-1.pa-2(@click="allow") 許可
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';

@Component
export default class ShiftAllowBtn extends Vue {
  @Prop() private userId!: string;
  @Prop() private date!: number;

  private get shiftId() {
    return this.$store.getters.shiftId(this.userId, this.date);
  }

private get managerId() {
    return this.$store.getters.userId;
  }

  private async allow() {
    await this.$store.dispatch(ACTION.WAIT,
      () => this.$store.dispatch(ACTION.ALLOW_SHIFT, {
        shiftId: this.shiftId,
        managerId: this.managerId,
      }),
    );
  }
}
</script>

<style lang="stylus" scoped>
</style>
