<template lang="pug">
v-layout(row align-center)
  v-flex(xs4)
    .display-1 {{ date | toDate }}
  v-flex(xs4)
    task-date-button(@click="yesterday"): v-icon navigate_before
    task-date-button(@click="today") 今日
    task-date-button(@click="tomorrow"): v-icon navigate_next
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import { TODAY, TOMORROW, YESTERDAY } from '@/types/ActionTypes';

@Component
export default class BaseTimeSelect extends Vue {
  private get date() {
    return this.$store.getters.date;
  }
  private today() {
    this.$store.dispatch(TODAY);
  }
  private yesterday() {
    this.$store.dispatch(YESTERDAY);
  }
  private tomorrow() {
    this.$store.dispatch(TOMORROW);
  }
}
</script>

<style lang="stylus" scoped>
</style>
