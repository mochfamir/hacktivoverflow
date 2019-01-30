<template>
  <div class="list-group list-group-flush">
    <a href="#" class="list-group-item" @click.prevent="hideFormAddQuestion"><router-link class="list-group-item" to="/">Home</router-link></a>
    <a href="#" class="list-group-item" @click.prevent="showAddQuestion">Add Question</a>
    <a href="#" class="list-group-item">Tags</a>
    <a href="#" class="list-group-item">Users</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formAddQuestion: false
    }
  },
  methods: {
    showAddQuestion() {
      if (this.formAddQuestion) {
        this.formAddQuestion = false
        this.$store.dispatch('pageAddQuestion', true)
      } else {
        this.formAddQuestion = true
        this.$store.dispatch('pageAddQuestion', false)
      }
    },
    hideFormAddQuestion() {
      this.$store.dispatch('getQuestions')
      this.$store.dispatch('pageAddQuestion', false)
    }
  }
}
</script>
