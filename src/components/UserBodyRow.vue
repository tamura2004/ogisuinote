<template lang="pug">
user-row-layout
  template(v-slot:name): task-row-cell
    router-link(:to="`/app/user/${userId}/tasks`") {{ userName }}
  template(v-slot:plan): task-row-cell {{ plan | toTime }}
  template(v-slot:lasttime): task-row-cell {{ lasttime }}
  template(v-slot:overwork): task-row-cell {{ overwork | toTime }}
  template(v-slot:permit): task-row-cell
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import TimeMeasurable from '@/components/TimeMeasurable';

@Component
export default class UserBodyRow extends Mixins(TimeMeasurable) {
}
</script>

<style lang="stylus" scoped>
</style>
