<template>
 <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Course</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="editCourseForm" v-model="isValid">
          <v-text-field
            label="Course Name"
            v-model="course.name"
          />
          <v-text-field
            label="Image URL"
            v-model="course.imageUrl"
          />
          <v-text-field
            label="Places"
            v-model.number="course.places"
            type="number"
          />
          <v-text-field
            label="Enrolled"
            v-model.number="course.enrolled"
            type="number"
            :rules="[v => v <= course.places || 'Enrolled must not exceed places']"
          />
          <v-text-field
            label="Duration"
            v-model="course.duration"
          />
          <v-text-field
            label="Cost"
            v-model.number="course.cost"
            type="number"
          />
          <v-textarea
            label="Description"
            v-model="course.description"
          />
          <v-select
            label="Status"
            v-model="course.status"
            :items="['Yes', 'No']"
            return-object
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey" text @click="goBack">Back</v-btn>
        <v-btn color="primary" :disabled="!isValid" @click="updateCourse">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'editCourse-view',
  data: () => ({
    isValid: false,
    course: {
      name: '',
      imageUrl: '',
      places: 0,
      enrolled: 0,
      duration: '',
      cost: 0,
      description: '',
      status: 'false' // default value
    }
  }),
  methods: {
    goBack () {
      this.$router.push('/admin')
    },
    updateCourse () {
      if (this.course.enrolled > this.course.places) {
        alert('Enrolled students cannot exceed places.')
        return
      }
      this.$store.dispatch('updateCourse', this.course)
      this.goBack()
    },
    handleStatusChange (status) {
      if (status === 'No') {
        this.course.enrolled = 0
      }
    },
    loadCourse (id) {
      const course = this.$store.getters.getCourseById(Number(id))
      console.log('Loaded course:', course)
      if (!course) {
        alert('Course not found!')
        this.goBack()
        return
      }
      this.course = { ...course }
      /*       } else {
        this.course = { ...course }
      } */
    }
  },
  created () {
    const id = parseInt(this.$route.params.id)
    console.log('Route ID:', id)
    this.loadCourse(id)
  }
}
</script>

<style scoped>
</style>
