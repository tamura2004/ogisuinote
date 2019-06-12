<template lang="pug">
div
  overwork-row-title
  overwork-row-body(
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
import Overwork from '../models/Overwork';

@Component({
  computed: {
    ...mapGetters([
      'userIds',
      'date',
    ]),
  },
})
export default class OverworkIndexPage extends Vue {
  private date!: () => number;
  private unsubscribe: any;

  private async created() {
    const query = db.collection('overworks')
      .where('date', '==', this.date);
    this.unsubscribe = await this.$store.dispatch(ACTION.LISTEN, {
      query,
      name: 'overworks',
      klass: Overwork,
    });
  }

  private destroyed() {
    this.unsubscribe();
  }
}
</script>

<style lang="stylus" scoped>
</style>
