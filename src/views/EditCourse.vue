<template>
 <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Course</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="editCourseForm" v-model="isValid" @submit.prevent="updateCourse">
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
            :disabled="course.status === 'Yes'"
            :rules="[v => v <= course.places || 'Enrolled must not exceed places']"
          />
          <v-text-field
            label="Duration"
            v-model="course.duration"
          />
          <v-text-field
            label="Registration Date"
            v-model="course.registrationDate"
          />
          <v-select
            label="Completed Course"
            v-model="course.status"
            :items= "['Yes', 'No']"
            return-object
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
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey" text @click="goBack">Go Back</v-btn>
        <v-btn color="primary" type="submit" :disabled="!isValid" @click="updateCourse">Update</v-btn>
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

      const updatedCourse = { ...this.course } // ensure you are passing the correct data structure
      this.$store.dispatch('updateCourse', updatedCourse).then(() => {
        alert('Course updated successfully')
        this.goBack()
      }).catch(error => {
        console.error('Error updating course:', error)
        alert('Failed to update the course')
      })
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
    }
  },
  watch: {
    'course.status' (newStatus) {
      // automatically set enrollees to 0 if the status is changed to 'Yes' (completed)
      if (newStatus === 'Yes') {
        this.course.enrolled = 0
      }
    }
  },
  created () {
    const id = parseInt(this.$route.params.id, 10) // ensure base 10 parsing
    console.log('Route ID:', id)
    if (isNaN(id)) {
      alert('Invalid Course ID!')
      this.goBack()
    } else {
      this.loadCourse(id)
    }
  }
}
</script>

<style scoped>
</style>
