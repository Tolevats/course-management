<template>
  <!-- isDialogOpen mirrors the isOpen prop to manage the dialog's state internally -->
  <v-dialog v-model="isDialogOpen" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Add New Course</span>
      </v-card-title>
      <!-- form -->
      <v-card-text>
        <v-form ref="addCourseForm" v-model="isValid">
          <v-text-field
            label="Course Name"
            v-model="course.name"
            :counter="30"
            :rules="[
              v => !!v || 'Name is required',
              v => (v && v.length <= 30) || 'Name must be less than 30 characters'
            ]"
          />
          <v-text-field
            label="Image URL"
            v-model="course.imageUrl"
            :counter="100"
            :rules="[
              v => !!v || 'Image URL is required',
              v => (v && v.length <= 100) || 'Name must be less than 100 characters'
            ]"
          />
          <v-text-field
            label="Places"
            v-model.number="course.places"
            type="number"
            :rules="[v => v > 0 || 'Must be greater than 0']"
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
            :counter="15"
            :rules="[
              v => !!v || 'Duration is required',
              v => (v && v.length <= 15) || 'Duration must be less than 15 characters'
            ]"
          />
          <v-text-field
            label="Registration Date"
            :value="formattedRegistrationDate"
            :disabled="true"
          />
          <v-text-field
            label="Cost"
            v-model.number="course.cost"
            type="number"
          />
          <v-textarea
            label="Description"
            v-model="course.description"
            :counter="300"
            :rules="[
              v => !!v || 'Description is required',
              v => (v && v.length <= 300) || 'Description must be less than 300 characters'
            ]"
            rows="3"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="success" :disabled="!isValid" @click="addCourse">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isValid: false,
      isDialogOpen: this.value, // initialize from prop
      course: {
        name: '',
        imageUrl: '',
        places: 0,
        enrolled: 0,
        duration: '',
        registrationDate: new Date().toISOString(), // initialize registrationDate
        cost: 0,
        description: ''
      }
    }
  },
  computed: {
    formattedRegistrationDate () {
      if (!this.course.registrationDate) return ''
      const date = new Date(this.course.registrationDate)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0') // months are zero-based
      const year = String(date.getFullYear()).slice(-2) // get last two digits of the year
      return `${day}/${month}/${year}`
    }
  },
  watch: {
    value (newVal) { // ensures the local property is updated when the parent changes the isOpen prop
      this.isDialogOpen = newVal // keep in sync when the parent prop changes
    },
    isDialogOpen (newVal) { // emits updates to the parent when the local property is changed
      this.$emit('input', newVal) // emit update to parent
    }
  },
  methods: {
    closeDialog () {
      this.isDialogOpen = false
    },
    addCourse () {
      if (this.course.enrolled > this.course.places) {
        alert('Enrolled students cannot exceed places.')
        return
      }

      const formattedDate = this.formattedRegistrationDate // get the formatted date
      const maxId = Math.max(0, ...this.$store.state.courses.map(course => course.id)) // Get max ID
      const newCourse = {
        id: maxId + 1, // generate the next consecutive ID
        ...this.course,
        status: false,
        registrationDate: formattedDate // use the formatted date
      }
      this.$store.dispatch('addCourse', newCourse).then(() => {
        alert('Course added successfully')
        this.closeDialog()
      }).catch(error => {
        console.error('Error adding course:', error)
        alert('Failed to add the course')
      })
    }
  }
}
</script>
