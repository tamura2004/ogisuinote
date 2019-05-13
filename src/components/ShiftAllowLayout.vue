<template lang="pug">
  span
    shift-only(:userId="userId" :date="date")
      shift-allowed-only(:userId="userId" :date="date")
        slot(name="allowed")
        template(v-slot:else)
          manager-only
            slot(name="allow")
            template(v-slot:else)
              base-row-cell-body 承認待ち
      template(v-slot:else)
        slot(name="none")
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import TimeMeasurable from '@/mixins/TimeMeasurable';

@Component
export default class ShiftAllowLayout extends Mixins(TimeMeasurable) {
}

</script>

<style lang="stylus" scoped>
</style>
