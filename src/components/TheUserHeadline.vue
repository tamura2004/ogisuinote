<template lang="pug">
the-user-headline-layout
  template(v-slot:name)
    .headline {{ userName }}
  template(v-slot:worktime)
    v-menu
      template(v-slot:activator="{ on }")
        v-btn(flat :disabled="!owner" @click="go").headline 始業{{ startTime }} 〜 終業{{ lasttime }}
          span(v-if="overwork > 0") (残業{{ overwork | toTime }})
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import TimeMeasurable from '@/mixins/TimeMeasurable';

@Component
export default class TheUserHeadline extends Mixins(TimeMeasurable) {
  private go() {
    this.$router.push('/app/shift/new');
  }
}
</script>

<style lang="stylus" scoped>
</style>
