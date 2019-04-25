<template lang="pug">
v-container(v-if="user")
  base-menu-card(title="シフト勤務申請")
    template(v-slot:form)
      v-form(v-model="valid")
        base-start-time-select-field(v-model="startTime")
        base-successor-select-field(v-model="successorId")
    template(v-slot:action)
      v-btn(color="primary" @click="save" :disabled="!valid") 申請
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';
import User from '@/models/User';
import { mapGetters } from 'vuex';

type validateFunc = Array<(v: string) => boolean | string>;

@Component({
  computed: {
    ...mapGetters(['mailDomain']),
  },
})
export default class ShiftNew extends Vue {
  private successorId: string | null = null;
  private startTime: number | null = null;
  private valid: boolean = false;

  private get date(): number {
    return this.$store.getters.date;
  }

  private get userId() {
    return this.$store.getters.userId;
  }
  private get user() {
    return this.$store.getters.user(this.userId);
  }

  private async save() {
    if (this.user === undefined) {
      alert('User must be logged in');
      return;
    }
    await this.$store.dispatch(ACTION.WAIT,
      async () => {
        await this.$store.dispatch(ACTION.CREATE_SHIFT, this);
      },
    );
    this.$router.go(-1);
  }
}
</script>

<style lang="stylus">
</style>
