<template>
<div>
    <router-link v-for="action in actions" :key="action.id" tag="button" class="btn btn-secondary btn-block" id="button" :to="action.link">{{action.label}}</router-link>
</div>
   
</template>

<script>
export default {
    props: ['actions'],
    data() {
        return {

        }
    }
        
}
</script>

<style>
  .btn-block { 
      color: black;
      background-color: white;
  }
</style>
