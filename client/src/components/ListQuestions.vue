<template>
  <div v-show="showPage">
    <div class="my-4">
      <div class="media">
        <div class="media-body">
          <a href="" @click.prevent="getDetail(question._id)" ><h5 class="mt-0"> {{question.title}} </h5></a>
          <hr>
          <div class="row">
            <div class="col-8">
              <p v-html="question.description"></p>
            </div>
            <div class="col-4">
              <ul class="list-inline">
                <li class="list-inline-item" v-for="tag in question.tag" :key="tag._id"><a href="" @click.prevent="search(tag)"><span class="badge badge-primary">{{tag}}</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listQuestions',
  props: ['question'],
  data() {
    return {
      showPage: true,
      description: ''
    }
  },
  methods: {
    getDetail(id) {
      this.$emit('getDetail', id)
    },
    search(tag) {
      let questions = []
      let dataSearch = this.$store.state.questions
      dataSearch.forEach((question, i) => {
        if (question.tag.includes(tag)) {
          questions.push(question)
        }
      });
      this.$store.dispatch('searchQuestion', questions)
    },
  }
}
</script>
