<template>
    <v-app-bar app color="#0b1c5b" dark>
          <v-img
          alt="logo"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="200"
          src="@/assets/Logo/SVG/main-logo-white-transparent.svg"
          width="150"
          />
        <v-spacer></v-spacer>
        <v-btn text to="/" exact>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn text to="/admin" exact>
          <v-icon>mdi-wrench</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  name: 'navbar-component'
}
</script>

<style scoped>
</style>
