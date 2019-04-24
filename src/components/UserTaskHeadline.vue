<template lang="pug">
user-task-headline-layout
  template(v-slot:name)
    .headline {{ userName }}
  template(v-slot:worktime)
    v-menu
      template(v-slot:activator="{ on }")
        v-btn(flat v-on="on").headline 始業8:40 〜 終業{{ lasttime }}
          span(v-if="overwork > 0") (残業{{ overwork | toTime }})
      v-toolbar(flat dense dark)
        v-toolbar-title シフト申請
      v-list
        v-list-tile(@click="shift(300)")
          v-list-tile-title 始業5:00〜終業13:30
        v-list-tile(@click="shift(360)")
          v-list-tile-title 始業6:00〜終業14:30
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import TimeMeasurable from '@/components/TimeMeasurable';

@Component
export default class UserTaskHeadline extends Mixins(TimeMeasurable) {
  private shift(minute: number) {
    alert(minute);
  }
}
</script>

<style lang="stylus" scoped>
</style>
