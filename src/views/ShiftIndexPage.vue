<template lang="pug">
div
  .headline.mt-3 シフト勤務一覧
  shift-row-title
  shift-row-body(
    v-for="userId in userIds"
    :userId="userId"
    :key="userId"
  )
</template>

<script lang="ts">
import * as ACTION from '@/types/ActionTypes';
import { db } from '@/plugins/firebase';
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Shift from '../models/Shift';

@Component({
  computed: {
    ...mapGetters([
      'userIds',
      'date',
    ]),
  },
})
export default class ShiftIndexPage extends Vue {
  private date!: () => number;
  private unsubscribe: any;

  private async created() {
    const query = db.collection('shifts')
      .where('date', '==', this.date);
    this.unsubscribe = await this.$store.dispatch(ACTION.LISTEN, {
      query,
      name: 'shifts',
      klass: Shift,
    });
  }

  private destroyed() {
    this.unsubscribe();
  }
}
</script>

<style lang="stylus" scoped>
</style>
