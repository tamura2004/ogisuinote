<template lang="pug">
  v-card.elevation-12
    v-toolbar(dark dense color="indigo")
      v-toolbar-title {{ title }}
    v-card-text
      slot(name="form")
    v-card-actions
      v-spacer
      slot(name="action")
    v-card-text
      slot(name="footer")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BaseNavigationCard extends Vue {
  @Prop() private title!: string;
}
</script>

<style lang="stylus">
</style>
