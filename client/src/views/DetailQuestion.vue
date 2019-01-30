<template>
  <div class="mt-3">
    <div class="col-8">
      <form-update-question :showModal="modalUpdate" :question="question" @formUpdateQuestion="modalUpdateQuestion" />
      <form-update-answer :showModal="formUpdateAnswer" :answer="answer" @formUpdateQuestion="formUpdateAnswer" @getAnswers="getAnswers" />
      <blockquote class="blockquote">
        <h2 class="mt-0 justify-content-center"> {{question.title}} </h2>
        <footer class="blockquote-footer"><cite title="Source Title"> {{question.user.name}} </cite></footer>
      </blockquote>
      <hr>
      <div class="card my-2">
        <div class="row">
          <div class="col-2">
            <div class="d-flex flex-column">
              <div class="p-2 ml-1 cursor">
                <img src="@/assets/icon/arrow-up-before.svg" @click="upvote" width="30px" height="30px" alt="">
              </div>
              <div class="p-2 ml-2"><h3>{{vote}}</h3></div>
              <div class="p-2 ml-1 cursor">
                <img src="@/assets/icon/arrow-down-before.svg" @click="downvote" width="30px" height="30px" alt="">
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="media mt-3">
              <div class="media-body">
                <div class="row">
                  <div class="col-8">
                    <p v-html="question.description"></p>
                    <ul class="list-inline">
                      <li class="list-inline-item" v-for="tag in question.tag" :key="tag._id"><a href="" @click.prevent="search(tag)"><span class="badge badge-primary">{{tag}}</span></a></li>
                    </ul>
                  </div>
                  <div class="col-4">
                    <div class="d-flex flex-column">
                        <a href="" class="float-right" @click.prevent="modalUpdateQuestion"><i class="fas fa-cog ml-2"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 class="mt-5">Answer:</h3>
      <hr>
      <span v-for="answer in answers" :key="answer._id"><list-answer @modalUpdateAnswer="modalUpdateAnswer" :answer="answer" @voteAnswer="voteAnswer" /></span>
      <span><add-answer @getAnswers="getAnswers" /></span>
    </div>
  </div>
</template>

<script>
import { baseUrl } from '@/config.js'
import AddAnswer from '@/components/AddAnswer.vue'
import ListAnswer from '@/components/ListAnswer.vue'
import FormUpdateQuestion from '@/components/FormUpdateQuestion.vue'
import FormUpdateAnswer from '@/components/FormUpdateAnswer.vue'

export default {
  name: 'detailQuestion',
  components: {
    AddAnswer,
    ListAnswer,
    FormUpdateQuestion,
    FormUpdateAnswer
  },
  props: ['dataQuestions'],
  data() {
    return {
      params: '',
      question: {},
      user: {},
      vote: 0,
      answers: [],
      answer: {},
      modalUpdate: false,
      formUpdateAnswer: false
    }
  },
  methods: {
    upvote() {
      let upvoteFilter = this.question.upvote.indexOf(this.user._id)
      let downvoteFilter = this.question.downvote.indexOf(this.user._id)
      if(this.question.user._id == this.user._id) {
        swal("Can't vote your question")
      } else {
        if (upvoteFilter === -1 && downvoteFilter === -1) {  // jika gak ada dua2 nya, maka push ke upvote
          this.question.upvote.push(this.user._id)
        } else if (upvoteFilter !== -1 && downvoteFilter === -1) { // jika upvote ada hapus yg di upvote
          this.question.upvote.splice(upvoteFilter, 1)
        } else if (downvoteFilter !== -1) {                  // jika downvote ada 
          this.question.downvote.splice(downvoteFilter, 1)
          this.question.upvote.push(this.user._id)
        }
        this.vote = this.question.upvote.length - this.question.downvote.length
        this.$store.dispatch('vote', this.question)
      }
    },
    downvote() {
      let upvoteFilter = this.question.upvote.indexOf(this.user._id)
      let downvoteFilter = this.question.downvote.indexOf(this.user._id)
      if(this.question.user._id == this.user._id) {
        swal("Can't vote your question")
      } else {
        if (upvoteFilter === -1 && downvoteFilter === -1) {  // jika gak ada dua2 nya, maka push ke upvote
          this.question.downvote.push(this.user._id)
        } else if (upvoteFilter === -1 && downvoteFilter !== -1) { // jika upvote ada hapus yg di upvote
          this.question.downvote.splice(downvoteFilter, 1)
        } else if (upvoteFilter !== -1) {                  // jika downvote ada 
          this.question.upvote.splice(upvoteFilter, 1)
          this.question.downvote.push(this.user._id)
        }
        this.vote = this.question.upvote.length - this.question.downvote.length
        this.$store.dispatch('vote', this.question)
      }
    },
    getQuestion() {
      this.params = this.$route.params.questionId
      this.user = JSON.parse(localStorage.getItem('user'))
      baseUrl.request({
        method: 'GET',
        url: `questions/${this.params}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.question = data
          this.vote = this.question.upvote.length - this.question.downvote.length
        })
        .catch(err => {
          swal(err)
        })
    },
    getAnswers() {
      baseUrl.request({
        method: 'GET',
        url: `answers/${this.$route.params.questionId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          this.answers = data
        })
        .catch(err => {
          swal(err)
        })
    },
    addAnswer(answer) {
      this.answers.push(answer)
    },
    voteAnswer (answer) {
      baseUrl.request({
        method: 'PUT',
        url: `answers/votes/${this.question._id}/${answer._id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: answer
      })
        .then(({ data }) => {
          let index
          this.answers.forEach((answer, i) => {
            if (answer._id === data._id) {
              index = i
            }
          })
          this.answers.splice(index, 1, data)
        })
        .catch(err => {
          swal(err)
        })
    },
    modalUpdateQuestion() {
      if (this.modalUpdate) this.modalUpdate = false
      else this.modalUpdate = true
    },
    modalUpdateAnswer(answer) {
      this.answer = answer
      if (this.formUpdateAnswer) this.formUpdateAnswer = false
      else this.formUpdateAnswer = true
    },
    search(tag) {
      this.$router.push({path: '/'})
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
  created() {
    this.getQuestion()
    this.getAnswers()
  },
  watch: { 
    $route(to, from) {
      this.params = to.params.questionId
      this.getQuestion()
      this.getAnswers()
    }
  }
}
</script>

<style>
.cursor {
  cursor: pointer;
}
</style>
