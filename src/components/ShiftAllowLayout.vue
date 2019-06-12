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
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters([
      'date',
    ]),
  },
})
export default class ShiftAllowLayout extends Vue {
  @Prop() private userId!: string;
}

</script>

<style lang="stylus" scoped>
</style>
