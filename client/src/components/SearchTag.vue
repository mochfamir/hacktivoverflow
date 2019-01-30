<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          Watched Tag
        </div>
        <div class="card-body">
          <input type="form-input" placeholder="Search tag" v-model="tag" @keyup.enter="addWatchedTag">
        </div>
        <hr>
        <div class="card-body">
          <ul class="list-inline">
            <li class="list-inline-item" v-for="tag in tags" :key="tag._id"><a href="" @click.prevent="search(tag)"><span class="badge badge-primary">{{tag}}</span></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: '',
      tags: []
    }
  },
  methods: {
    addWatchedTag() {
      this.tags.push(this.tag)
      this.tag = ''
    },
    search(tag) {
      let questions = []
      let dataSearch = this.$store.state.questions
      dataSearch.forEach((question, i) => {
        if (question.tag.includes(tag)) {
          questions.push(question)
        }
      });
      this.$store.dispatch('searchQuestion', questions)
    },
  },
  computed: {

  }
}
</script>

<style>

</style>
