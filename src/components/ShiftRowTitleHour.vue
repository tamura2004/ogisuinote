<template lang="pug">
  base-row-cell-title
    v-layout(row wrap)
      shift-row-title-hour-six(start="4")
      shift-row-title-hour-six(start="10")
      shift-row-title-hour-six(start="16")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class ShiftRowTitleHour extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
