<template>
 <v-container fluid>
    <v-card>
      <v-card-title>
        <span class="text-h4 font-weight-bold">Edit Course</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="editCourseForm" v-model="isValid" @submit.prevent="updateCourse">
          <v-row>
            <v-col cols="12" md="6" lg="4">
              <v-text-field
                label="Course Name"
                v-model="course.name"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-text-field
                label="Image URL"
                v-model="course.imageUrl"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-text-field
                label="Places"
                v-model.number="course.places"
                type="number"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-text-field
                label="Enrolled"
                v-model.number="course.enrolled"
                type="number"
                :disabled="course.status === 'Yes'"
                :rules="[v => v <= course.places || 'Enrolled must not exceed places']"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-text-field
                label="Duration"
                v-model="course.duration"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="6" lg="4">
              <v-text-field
                label="Registration Date"
                v-model="course.registrationDate"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="6" lg="5" class="mx-auto">
              <v-select
                label="Completed Course"
                v-model="course.status"
                :items= "['Yes', 'No']"
                outlined
                required
                return-object
              />
            </v-col>
            <v-col cols="12" md="6" lg="5" class="mx-auto">
              <v-text-field
                label="Cost"
                v-model.number="course.cost"
                type="number"
                outlined
                required
              />
            </v-col>
            <v-col cols="12" md="8" lg="8" class="mx-auto">
              <v-textarea
                label="Description"
                v-model="course.description"
                outlined
                rows="4"
                required
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" color="grey" text @click="goBack">Go Back</v-btn>
        <v-btn class="mx-auto" color="primary" type="submit" :disabled="!isValid" @click="updateCourse">Update</v-btn>
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

      const updatedCourse = { ...this.course } // ensure passing the correct data structure
      this.$store.dispatch('updateCourse', updatedCourse).then(() => {
        alert('Course updated successfully')
        this.goBack()
      }).catch(error => {
        console.error('Error updating course:', error)
        alert('Failed to update the course')
      })
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
.v-card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px;
}

.text-h4 {
  color: #1976D2;
}

.v-form {
  margin-top: 20px;
}

.v-btn {
  min-width: 120px;
}
</style>
