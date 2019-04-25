<template lang="pug">
v-layout(row align-center)
  v-flex(xs4)
    .display-1 {{ date | toDate }}
  v-flex(xs4)
    base-date-button(@click="yesterday"): v-icon navigate_before
    base-date-button(@click="today") 今日
    base-date-button(@click="tomorrow"): v-icon navigate_next
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import * as ACTION from '@/types/ActionTypes';

@Component
export default class BaseDateButtonGroup extends Vue {
  private get date() {
    return this.$store.getters.date;
  }
  private today() {
    this.$store.dispatch(ACTION.TODAY);
  }
  private yesterday() {
    this.$store.dispatch(ACTION.YESTERDAY);
  }
  private tomorrow() {
    this.$store.dispatch(ACTION.TOMORROW);
  }
}
</script>

<style lang="stylus" scoped>
</style>
