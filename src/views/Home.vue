<template>
  <div>
    <v-container>
      <h1>Course List</h1>
      <v-row>
        <v-col v-for="course in courses" :key="course.id" cols="12" sm="6" md="4" lg="4">
          <CourseCard :course="course" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CourseCard from '../components/CourseCard.vue'

export default {
  name: 'home-view',
  components: {
    CourseCard
  },
  computed: mapState(['courses'])
}
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 2rem;
  font-style: italic;
  padding: 30px;
}

/* media queries for larger screens */
@media (min-width: 768px) {
  h1 {
    font-size: 3rem;
  }
}
</style>
