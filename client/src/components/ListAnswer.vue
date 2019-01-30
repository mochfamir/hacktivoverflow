<template>
  <div>
    <div class="card my-5">
      <div class="row">
        <div class="col-2">
          <div class="d-flex flex-column">
            <div class="p-2 ml-1 cursor">
              <img src="@/assets/icon/arrow-up-before.svg" @click="upvote" width="30px" height="30px" alt="">
            </div>
            <div class="p-2 ml-2"><h3>{{answer.upvote.length - answer.downvote.length}}</h3></div>
            <div class="p-2 ml-1 cursor">
              <img src="@/assets/icon/arrow-down-before.svg" @click="downvote" width="30px" height="30px" alt="">
            </div>
          </div>
        </div>
        <div class="col-7">
          <div>
            <div class="media mt-3">
              <div class="media-body">
                <blockquote class="blockquote">
                  <h4 class="mt-0 justify-content-center"> {{answer.title}} </h4>
                  <footer class="blockquote-footer"><cite title="Source Title"> {{answer.user.name}} </cite></footer>
                </blockquote>
                <div class="row">
                  <div class="col-8">
                    <p v-html="answer.description"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 mt-2 d-flex justify-content-center">
          <a href="" @click.prevent="modalUpdateAnswer"><i class="fas fa-cog ml-2"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from '@/config.js'
export default {
  name: 'listAnswer',
  props: ['answer'],
  data() {
    return {
      dataAnswer: {},
      user: {},
      author: false
    }
  },
  methods: {
    upvote() {
      let upvoteFilter = this.answer.upvote.indexOf(this.user._id)
      let downvoteFilter = this.answer.downvote.indexOf(this.user._id)
      if (this.answer.user._id == this.user._id) {
        swal("Can't vote your answer")
      } else {
        if (upvoteFilter === -1 && downvoteFilter === -1) {  // jika gak ada dua2 nya, maka push ke upvote
          this.answer.upvote.push(this.user._id)
        } else if (upvoteFilter !== -1 && downvoteFilter === -1) { // jika upvote ada hapus yg di upvote
          this.answer.upvote.splice(upvoteFilter, 1)
        } else if (downvoteFilter !== -1) {                  // jika downvote ada 
          this.answer.downvote.splice(downvoteFilter, 1)
          this.answer.upvote.push(this.user._id)
        }
        this.$emit('voteAnswer', this.answer)
      }
    },
    downvote() {
      let upvoteFilter = this.answer.upvote.indexOf(this.user._id)
      let downvoteFilter = this.answer.downvote.indexOf(this.user._id)
      if (this.answer.user._id == this.user._id) {
        swal("Can't vote your answer")
      } else {
        if (upvoteFilter === -1 && downvoteFilter === -1) {  // jika gak ada dua2 nya, maka push ke upvote
          this.answer.downvote.push(this.user._id)
        } else if (upvoteFilter === -1 && downvoteFilter !== -1) { // jika upvote ada hapus yg di upvote
          this.answer.downvote.splice(downvoteFilter, 1)
        } else if (upvoteFilter !== -1) {                  // jika downvote ada 
          this.answer.upvote.splice(upvoteFilter, 1)
          this.answer.downvote.push(this.user._id)
        }
        this.$emit('voteAnswer', this.answer)
      }
    },
    modalUpdateAnswer() {
      this.$emit('modalUpdateAnswer', this.answer)
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.answer.user._id === this.user._id) {
      this.owner = true
    } else this.owner = false
  }
}
</script>
