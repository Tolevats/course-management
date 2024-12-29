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
            :rules="[v => !!v || 'Name is required']"
          />
          <v-text-field
            label="Image URL"
            v-model="course.imageUrl"
            :rules="[v => !!v || 'Image URL is required']"
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
          />
          <v-text-field
            label="Cost"
            v-model.number="course.cost"
            type="number"
          />
          <v-textarea
            label="Description"
            v-model="course.description"
            rows="3"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey" text @click="closeDialog">Cancel</v-btn>
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
        cost: 0,
        description: ''
      }
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
      const newCourse = {
        ...this.course,
        status: false,
        registrationDate: new Date().toISOString()
      }
      this.$store.dispatch('addCourse', newCourse)
      this.closeDialog()
    }
  }
}
</script>
