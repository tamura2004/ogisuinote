<template lang="pug">
  span
    overwork-only(:userId="userId" :date="date")
      overwork-allowed-only(:userId="userId" :date="date")
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
export default class OverworkAllowLayout extends Mixins(TimeMeasurable) {
}

</script>

<style lang="stylus" scoped>
</style>
