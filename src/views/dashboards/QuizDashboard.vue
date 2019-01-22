<template>

<div class="container mt-5">
  <div class="row justify-content-center">
    <b-card class=" cad-body col-md-6 mt-5">
    <Quiz :id="quizId">

    <!-- <div slot="intro" slot-scope="props">
       {{props.title}}
    </div> -->
  
    <div slot="results" slot-scope="props">
      <h1>GRATULACJE!</h1> 
         {{props.correct}} / {{props.length}} questions. 
        Twój wynik:  {{props.perc}}%.
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
    