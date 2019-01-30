<template>
  <div class="container">
    <div class="row">
      <div class="span4 well card" style="padding-bottom:0">
        <div class="card-body">
          <form action="" method="POST" @submit.prevent="createAnswer">
            <input type="text" class="form-control" v-model="title" placeholder="Title"><br>
            <wysiwyg v-model="description" /><br>
            <button type="submit" class="btn btn-primary" >Post Your Answer</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {baseUrl} from '@/config.js'

export default {
  name: 'addAnswer',
  data() {
    return {
      title: '',
      description: '',
    }
  },
  methods: {
    createAnswer() {
      baseUrl.request({
        method: 'POST',
        url: `answers/${this.$route.params.questionId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: this.title,
          description: this.description,
        }
      })
        .then(({data}) => {
          this.$emit('getAnswers')
          swal('add answer success')
          this.title = ''
          this.description = ''
        })
        .catch(err => {
          swal(err)
        })
    }
  }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
