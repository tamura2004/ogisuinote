<template lang="pug">
the-user-headline-layout
  template(v-slot:name)
    .headline {{ userName(userId, date) }}
  template(v-slot:worktime)
    v-menu
      template(v-slot:activator="{ on }")
        v-btn(flat :disabled="!owner(userId)" @click="go").headline 始業{{ startTime(userId, date) }} 〜 終業{{ lastTime(userId, date) }}
          span(v-if="overworkTime(userId) > 0") (残業{{ overworkTime(userId, date) | toTime }})
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Task from '@/models/Task';
import moment from 'moment';

@Component({
  computed: {
    ...mapGetters([
      'owner',
      'userName',
      'startTime',
      'lastTime',
      'overworkTime',
    ]),
  },
})
export default class TheUserHeadline extends Vue {
  @Prop() private userId!: string;

  private get date() {
    return this.$store.getters.date;
  }

  private go() {
    this.$router.push('/app/shift/new');
  }
}
</script>

<style lang="stylus" scoped>
</style>
