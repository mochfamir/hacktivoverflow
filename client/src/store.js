import Vue from 'vue'
import Vuex from 'vuex'
import { baseUrl } from '@/config.js'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    questions: [],
    answers: [],
    page: {
      formAddQuestion: false,
      listQuestion: true
    }
  },
  mutations: {
    mutateDataLogin (state, dataUser) {
      state.user = dataUser
    },
    mutateLogout (state) {
      state.user = {}
    },
    mutateNewQuestion (state, question) {
      state.questions.push(question)
    },
    mutateDataQuestions (state, questions) {
      state.questions = questions
    },
    mutateDataAnswers (state, answers) {
      state.answers = answers
    },
    mutateUpdatedQuestion (state, question) {
      let index
      state.questions.forEach((el, i) => {
        if (el._id === question._id) {
          index = i
        }
      })
      state.questions.splice(index, 1, question)
    },
    mutateRemoveQuestion (state, id) {
      let index
      state.questions.forEach((el, i) => {
        if (el._id === id) {
          index = i
        }
      })
      state.questions.splice(index, 1)
    },
    mutateFormAddQuestion (state, value) {
      state.page.formAddQuestion = value
    }
  },
  actions: {
    login (context, dataUser) {
      if (localStorage.getItem('access_token')) {
        context.commit('mutateDataLogin', JSON.parse(localStorage.getItem('user')))
      } else {
        baseUrl.request({
          method: 'POST',
          url: 'users/login',
          data: {
            email: dataUser.email,
            password: dataUser.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('user', JSON.stringify(data.user))
            context.commit('mutateDataLogin', data.user)
            swal(`Sign in success`)
            this.$router.push({ path: '/' })
          })
          .catch(err => {
            console.log(err)
            swal(err)
          })
      }
    },
    logout (context) {
      context.commit('mutateLogout')
    },
    searchQuestion (context, questions) {
      context.commit('mutateDataQuestions', questions)
    },
    getQuestions (context) {
      baseUrl.request({
        method: 'GET',
        url: 'questions',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('mutateDataQuestions', data)
        })
        .catch(err => {
          swal(err)
        })
    },
    getAnswers (context, questionId) {
      baseUrl.request({
        method: 'GET',
        url: `answers/${questionId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('mutateDataAnswers', data)
        })
        .catch(err => {
          swal(err)
        })
    },
    createQuestion (context, question) {
      baseUrl.request({
        method: 'POST',
        url: 'questions',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: question
      })
        .then(({ data }) => {
          swal('add question success')
          context.commit('mutateNewQuestion', data)
        })
        .catch(err => {
          swal(err)
        })
    },
    updateQuestion (context, question) {
      baseUrl.request({
        method: 'PUT',
        url: `questions/${question._id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: question
      })
        .then(({ data }) => {
          context.commit('mutateUpdatedQuestion', data)
        })
        .catch(err => {
          swal(err.response.data.msg)
        })
    },
    vote (context, question) {
      baseUrl.request({
        method: 'PUT',
        url: `questions/votes/${question._id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: question
      })
        .then(({ data }) => {
          context.commit('mutateUpdatedQuestion', data)
        })
        .catch(err => {
          swal(err)
        })
    },
    removeQuestion (context, id) {
      baseUrl.request({
        method: 'DELETE',
        url: `questions/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('mutateRemoveQuestion', data)
        })
        .catch(err => {
          swal(err.response.data.msg)
        })
    },
    pageAddQuestion (context, value) {
      context.commit('mutateFormAddQuestion', value)
    }
  }
})
