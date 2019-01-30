<template>
  <div class="container">
    <div class="row">
      <div class="span4 well card" style="padding-bottom:0">
        <div class="card-body">
          <form action="" method="POST" @submit.prevent="createQuestion">
            <input type="text" class="form-control" v-model="title" placeholder="Title"><br>
            <wysiwyg v-model="description" /><br>
            <ul class="list-inline">
              <li class="list-inline-item" v-for="tag in tags" :key="tag._id"><span class="badge badge-primary">{{tag}}</span></li>
            </ul>
            <input type="text" class="form-control" v-model="tmpTag" placeholder="Tags (press <space> for new tags)" @keyup.space="addTag"><br>
            <button type="submit" class="btn btn-primary" >Post Your Question</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {baseUrl} from '@/config.js'

export default {
  name: 'addQuestion',
  data() {
    return {
      tmpTag: '',
      title: '',
      description: '',
      tags: []
    }
  },
  methods: {
    addTag() {
      this.tags.push(this.tmpTag)
      this.tmpTag = ''
    },
    createQuestion() {
      this.$store.dispatch('createQuestion', {
        title: this.title,
        description: this.description,
        tag: this.tags
      })
      this.title = ''
      this.description = ''
      this.tags = []
      this.$store.dispatch('pageAddQuestion', false)
    }
  }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>


