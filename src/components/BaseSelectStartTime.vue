<template lang="pug">
base-select(
  v-on="$listeners"
  label="シフト勤務時間"
  :items="items"
  :value="value"
)
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class BaseSelectStartTime extends Vue {
  @Prop() private value!: any;

  private get items(): Array<{ text: string, value: number }> {
    const ret = [];
    for (let i = 0; i < 14; i++) {
      const minute = (5 + i) * 60; // start time of work by minute ex) 8:40 -> 520 (min)
      const startTimeLabel = this.toTime(minute);
      const endTimeLabel = this.toTime(minute + 8.5 * 60);
      ret.push({
        value: minute,
        text: `日勤（${this.toTime(minute)}-） ${startTimeLabel}〜${endTimeLabel}`,
      });
    }
    return ret;
  }

  private toTime(minute: number): string {
    return moment().startOf('day').add(minute, 'minute').format('H:mm');
  }
}
</script>

<style lang="stylus" scoped>
.b
  border solid 1px grey
</style>
