<template>

<div class="container mt-5">
  <div class="row justify-content-center">
    <b-card class="col-md-7 mt-5">
    <Quiz :id="quizId">
    <div class="text-center" slot="results" slot-scope="props">
        <b> {{props.correct}} / {{props.length}}</b> odpowiedzi poprawne. 
        Twój wynik: <b> {{props.perc}}%</b>.
    </div>
  </Quiz>
  </b-card>
   
  </div>
</div>

</template>

<script>

import Quiz from '../../components/Quiz.vue'


export default {
  components: {
    Quiz,
  },
data() {
    return {
      quizId: this.$route.params.id,
    }
  },
}
</script>

<style>

</style>
    