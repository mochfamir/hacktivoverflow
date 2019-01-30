<template>
  <div>
    <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center">
      <div class="container">
        <div class="row">
          <div class="col-2">
            <!-- <a class="navbar-brand" href="#">Navbar</a> -->
            <router-link to="/"><img @click="getQuestions" src="@/assets/icon/727cbfbd-466a-492a-a7ac-130f32a0d48f.png" height="100px" alt=""></router-link>
          </div>
        </div>
        <div class="col-8">
          <div class="collapse navbar-collapse clearfix" id="navbarSupportedContent">
            <form class="form-inline my-2 my-lg-0 float-right" @submit.prevent="search">
              <input class="form-control mr-sm-2" type="search" placeholder="Search by title" v-model="inputSearch" aria-label="Search">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-nav">
          <router-link v-if="!hasLogin" to="/login"><button class="btn btn-outline-success">Sign In</button></router-link>
          <button v-else class="btn btn-outline-success" @click="logout">Log Out</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputSearch: '',
      hasLogin: false
    }
  },
  methods: {
    cekLogin() {
      if (localStorage.getItem('access_token')) {
        this.hasLogin = true
      } else {
        this.hasLogin = false
      }
    },
    logout() {
      this.hasLogin = false
      alert(this.hasLogin)
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      this.$store.dispatch('logout')
      // this.cekLogin()
    },
    search() {
      this.$router.push({path: '/'})
      let questions = []
      let dataSearch = this.$store.state.questions
      dataSearch.forEach((question, i) => {
        if (question.title.toLowerCase().search(this.inputSearch) !== -1) {
          questions.push(question)
        }
      });
      this.$store.dispatch('searchQuestion', questions)
      this.inputSearch = ''
    },
    getQuestions() {
      this.$store.dispatch('getQuestions')
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  watch: {
    user(v) {
      if (v) this.hasLogin = true
      else this.hasLogin = false
    }
  }
}
</script>

