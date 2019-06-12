<template lang="pug">
overwork-row-layout
  template(v-slot:name): base-row-cell-body
    router-link(:to="`/app/user/${userId}/tasks`") {{ userName(userId) }}
  template(v-slot:plan): base-row-cell-body {{ plan(userId, date) | toTime }}
  template(v-slot:starttime): base-row-cell-body {{ startTime(userId, date) }}
  template(v-slot:lasttime): base-row-cell-body {{ lastTime(userId, date) }}
  template(v-slot:overwork): base-row-cell-body {{ overworkTime(userId, date) | toTime }}
  template(v-slot:permit)
    overwork-allow-layout(:userId="userId" :date="date")
      template(v-slot:allowed)
        base-row-cell-body.indigo.white--text
          overwork-manager-name(:userId="userId" :date="date")
      template(v-slot:allow)
        overwork-allow-btn(:userId="userId" :date="date")
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
      'plan',
      'startTime',
      'lastTime',
      'overworkTime',
      'date',
    ]),
  },
})
export default class OverworkBodyRow extends Vue {
  @Prop() private userId!: string;
}
</script>

<style lang="stylus" scoped>
</style>
