<template lang="pug">
span
  template(v-if="shift(userId, date).managerId")
    slot
  template(v-else)
    slot(name="else")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters([
      'date',
      'shift',
    ]),
  },
})
export default class ShiftAllowedOnly extends Vue {
  @Prop() private userId!: string;
}
</script>

<style lang="stylus" scoped>
</style>
