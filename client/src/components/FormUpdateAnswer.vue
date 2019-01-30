<template>
  <div class="modal fade bd-example-modal-lg" id="updateAnswer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <button type="" class="btn btn-primary" @click.prevent="updateAnswer" >Update Your Answer</button>
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
  name: 'formUpdateAnswer',
  props: ['showModal', 'answer'],
  data() {
    return {
      title: '',
      description: '',
    }
  },
  methods: {
    updateAnswer() {
      console.log('masuk')
      baseUrl.request({
        method: 'PUT',
        url: `answers/${this.$route.params.questionId}/${this.answer._id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: this.title,
          description: this.description
        }
      })
        .then(({data}) => {
          this.title = ''
          this.description = ''
          $('#updateAnswer').modal('hide')
          this.$emit('getAnswers')
        })
        .catch(err => {
          swal(err.response.data.msg)
        })
    }
  },
  watch: {
    showModal(v) {
      if (v) {
        this.title = this.answer.title
        this.description = this.answer.description
        $('#updateAnswer').modal('show')
        setTimeout(() => {
          this.$emit('formUpdateAnswer')
        }, 400)
      }
      else $('#updateAnswer').modal('hide')
    },
  }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>



