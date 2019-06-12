<template lang="pug">
shift-row-layout
  template(v-slot:name): base-row-cell-body {{ userName(userId) }}
  template(v-slot:successor): base-row-cell-body {{ successorName(userId, date) }}
  template(v-slot:shift)
    base-row-cell-body
      svg(
        width="100%"
        height="100%"
        viewBox="270 0 1080 10"
        preserveAspectRatio="none"
      )
        g(fill="none" stroke="grey" stroke-width="1" stroke-dasharray="1 1")
          line(
            v-for="i in 18"
            :x1="240 + i * 60"
            y1="0"
            :x2="240 + i * 60"
            y2="10"
        )
        g(fill="none" stroke="green" stroke-width="3")
          line(
            :x1="startTimeByMinute(userId, date)"
            y1="5"
            :x2="onTimeByMinute(userId, date)"
            y2="5"
        )
        g(fill="none" stroke="red" stroke-width="3")
          line(
            :x1="onTimeByMinute(userId, date)"
            y1="5"
            :x2="lastTimeByMinute(userId, date)"
            y2="5"
        )
  template(v-slot:permit)
    shift-allow-layout(:userId="userId" :date="date")
      template(v-slot:allowed)
        base-row-cell-body.indigo.white--text
          shift-manager-name(:userId="userId" :date="date")
      template(v-slot:allow)
        shift-allow-btn(:userId="userId" :date="date")
      template(v-slot:none)
        base-row-cell-no-data
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters([
      'userName',
      'successorName',
      'date',
      'startTimeByMinute',
      'onTimeByMinute',
      'lastTimeByMinute',
    ]),
  },
})
export default class ShiftRowBody extends Vue {
  @Prop() private userId!: string;
}

</script>

<style lang="stylus" scoped>
</style>
