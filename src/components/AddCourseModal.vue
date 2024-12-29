<template>
  <v-container>
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
          <v-btn color="primary" :disabled="!isValid" @click="addCourse">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    isValid: false,
    isDialogOpen: false, // Local property to mirror the isOpen prop
    course: {
      name: '',
      imageUrl: '',
      places: 0,
      enrolled: 0,
      duration: '',
      cost: 0,
      description: ''
    }
  }),
  watch: {
    isOpen (newVal) { // ensures the local property is updated when the parent changes the isOpen prop
      this.isDialogOpen = newVal // Keep in sync when the prop changes
    },
    isDialogOpen (newVal) { // emits updates to the parent when the local property is changed
      this.$emit('update:isOpen', newVal) // Notify parent of changes
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
