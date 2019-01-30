<template>
  <div class="home">
    <router-view :dataQuestions="dataQuestions"></router-view>
    <div class="container mt-0">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-8">
          <span v-if="formAddQuestion"><add-question /></span>
          <span v-else v-for="question in dataQuestions" :key="question._id"><list-questions :question="question" @getDetail="getQuestionDetail" /></span>
        </div>
        <div class="col-3">
          <search-tag />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddQuestion from '@/components/AddQuestion.vue'
import ListQuestions from '@/components/ListQuestions.vue'
import SearchTag from '@/components/SearchTag.vue'

export default {
  name: 'home',
  props: ['formAddQuestion'],
  components: {
    AddQuestion,
    ListQuestions,
    SearchTag
  },
  data() {
    return {
      dataQuestions: [],
    }
  },
  methods: {
    getQuestionDetail(questionId) {
      this.$router.push({path: `/${questionId}`})
    },
  },
  computed: {
    questions() {
      return this.$store.state.questions
    },
    formAddQuestion() {
      return this.$store.state.page.formAddQuestion
    }
  },
  watch: {
    questions(v) {
      this.dataQuestions = v
    },
    $route(to, from) {
      console.log(to.params)
    }
  },
  mounted() {
    this.dataQuestions = this.$store.state.questions
  }
}
</script>
