<template>
<div>
    <b-link v-on:click="logout" class="btn btn-logout">Wyloguj się</b-link>
</div>
   
</template>

<script>
export default {
    data() { 
        return {
           
        }
    },
     methods: {

                logout() {
                this.$store.dispatch('logout');
                }
            }
}
</script>

<style>
a {
    color: #fff;
}

a:hover {
    color: rgba(228, 228, 228, 0.527);
}
.btn {
    font-family: 'Lato', sans-serif;
}
.btn:hover{
  border-radius: 0px;
  font-size: 1.2rem;
  background-color: #035abd;
}
</style>
