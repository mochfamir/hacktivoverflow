<template>
  <div class="modal fade bd-example-modal-lg" id="formUpdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="span4 well card col-12" style="padding-bottom:0">
                <div class="card-body">
                  <form action="" method="POST">
                    <input type="text" class="form-control" v-model="title" placeholder="Title"><br>
                    <wysiwyg v-model="description" /><br>
                    <ul class="list-inline">
                      <li class="list-inline-item" v-for="tag in tags" :key="tag._id"><span class="badge badge-primary">{{tag}}</span></li>
                    </ul>
                    <input type="text" class="form-control" v-model="tmpTag" placeholder="Tags (press <space> for new tags)" @keyup.space="addTag"><br>
                    <button type="" class="btn btn-primary" @click.prevent="updateQuestion" >Update Your Question</button>
                    <button type="" class="btn btn-danger" @click.prevent="removeQuestion" >Delete Your Question</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {baseUrl} from '@/config.js'
import { setTimeout } from 'timers';

export default {
  name: 'formUpdateQuestion',
  props: ['showModal', 'question'],
  data() {
    return {
      tmpTag: '',
      title: this.question.title,
      description: '',
      tags: []
    }
  },
  methods: {
    addTag() {
      this.tags.push(this.tmpTag)
      this.tmpTag = ''
    },
    updateQuestion() {
      this.$store.dispatch('updateQuestion', {
        _id: this.$route.params.questionId,
        title: this.title,
        description: this.description,
        tags: this.tags
      })
    },
    removeQuestion() {
      this.$store.dispatch('removeQuestion', this.question._id)
      $('#formUpdate').modal('hide')
      this.$router.push({path: '/'})
    }
  },
  watch: {
    showModal(v) {
      if (v) {
        $('#formUpdate').modal('show')
        setTimeout(() => {
          this.$emit('formUpdateQuestion')
        }, 400)
      }
      else $('#formUpdate').modal('hide')
    },
  }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>



