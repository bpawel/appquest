<template>
<div>
     Welcome Back {{user.email}}
</div>
    
</template>

<script>
import { mapState } from 'vuex' 

export default {
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style scoped>

</style>
