<template>
  <v-footer>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>Tolevats</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'footer-component'
}
</script>

<style scoped>
.v-footer {
    color:#fff;
    background-color: #0b1c5b;
}
</style>
