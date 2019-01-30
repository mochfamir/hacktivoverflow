<template>
  <div id="app">
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <div class="col-2">
          <Menu @showFormAddQuestion="showFormAddQuestion" />
        </div>
        <div class="col-10 mt-0">
          <router-view :formAddQuestion="page.formAddQuestion" ></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Menu from '@/components/Menu.vue'

export default {
  components: {
    Navbar,
    Menu
  },
  data() {
    return {
      page: {
        formAddQuestion: false
      }
    }
  },
  methods: {
    showFormAddQuestion(value) {
      console.log(value)
      this.page.formAddQuestion = value
    }
  },
  mounted() {
    this.$store.dispatch('getQuestions')
    // this.$store.dispatch('getAnswers')
  }
}
</script>

