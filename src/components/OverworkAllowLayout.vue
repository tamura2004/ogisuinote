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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters([
      'date',
    ]),
  },
})
export default class OverworkAllowLayout extends Vue {
  @Prop() private userId!: string;
}

</script>

<style lang="stylus" scoped>
</style>
