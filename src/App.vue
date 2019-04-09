<template lang="pug">
v-app
  v-toolbar(app dense)
    v-toolbar-title.headline.indigo--text おぎすい予定帳
  v-content
    v-container(fluid)
      v-layout(row align-center)
        v-flex(xs2)
          .display-1 {{ date.toLocaleDateString() }}
        v-flex(xs8)
          v-btn(small dark color="indigo lighten-1" @click="yesterday"): v-icon navigate_before
          v-btn(small dark color="indigo lighten-1" @click="today") 今日
          v-btn(small dark color="indigo lighten-1" @click="tomorrow"): v-icon navigate_next
      v-layout(row align-center)
        v-flex(xs1): .indigo.white--text.title.pa-1.ma-1 優先度
        v-flex(xs5): .indigo.white--text.title.pa-1.ma-1 作業内容
        v-flex(xs2): .indigo.white--text.title.pa-1.ma-1 見込時間
        v-flex(xs2): .indigo.white--text.title.pa-1.ma-1 実績時間
        v-flex(xs2): .indigo.white--text.title.pa-1.ma-1 コメント
      v-layout(row align-center v-for="[key, task] in Array.from(tasks)" :key="key")
        v-flex(xs1)
          v-select.ma-1(hide-details :items="priorities" solo v-model="task.priority")
        v-flex(xs5)
          v-text-field.ma-1(hide-details solo v-model="task.name")
        v-flex(xs2)
          v-select.ma-1(hide-details :items="times" solo v-model="task.plan")
        v-flex(xs2)
          v-select.ma-1(hide-details :items="times" solo v-model="task.actual")
        v-flex(xs2)
          v-text-field.ma-1(hide-details solo v-model="task.memo")
      v-layout(row align-center)
        v-flex(xs1)
          v-select.ma-1(hide-details :items="priorities" solo v-model="form.priority")
        v-flex(xs5)
          v-text-field.ma-1(hide-details solo v-model="form.name")
        v-flex(xs2)
          v-select.ma-1(hide-details :items="times" solo v-model="form.plan" @change="save")
        v-flex(xs2)
          v-select.ma-1(hide-details :items="times" solo v-model="form.actual")
        v-flex(xs2)
          v-text-field.ma-1(hide-details solo v-model="form.memo")


</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Task from '@/models/Task';
import { CREATE } from '@/types/ActionTypes';
import _ from 'lodash';

@Component
export default class App extends Vue {
  private date: Date = new Date();
  private priorities = ['高', '中', '低'];
  private tasks: Map<string, Task> | null = null;
  private form: Form<Task> = Task.form();

  private created() {
    this.tasks = _.cloneDeep(this.$store.getters.tasks('abc', '2019/4/9'));
    this.form.priority = '中';
  }

  private get times(): number[] {
    const ret = [];
    for (let i = 0; i < 10; i++) {
      ret.push((i + 1) / 2);
    }
    return ret;
  }

  private today() {
    this.date = new Date();
  }

  private yesterday() {
    this.date = this.dateAdd(-1);
  }

  private tomorrow() {
    this.date = this.dateAdd(1);
  }

  private dateAdd(n: number): Date {
    const date = _.cloneDeep(this.date);
    date.setDate(date.getDate() + n);
    return date;
  }

  private save() {
    this.form.userId = 'abc';
    this.form.date = this.date.toLocaleDateString(),

    alert(JSON.stringify(this.form));
    if (Task.valid(this.form)) {
      alert('valid');
      this.$store.dispatch(CREATE, {
        payload: new Task({...this.form}),
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.b
  border solid 1px black
</style>
