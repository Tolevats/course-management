<template>
    <v-card class="course-card" :style="{ border: `2px solid #0b1c5b` }">
        <v-img :src="course.image" class="course-image" height="240px" contain></v-img>
        <v-card-title class="course-title">{{ course.name }}</v-card-title>
        <v-card-text class="course-info">
          <v-timeline align-top dense>
            <v-timeline-item v-for="(item, index) in timelineItems" :key="index" color="#0b1c5b" small>
              <div>
                {{ item.label }}: <strong>{{ item.value }}</strong>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
        <v-divider color="#0b1c5b"></v-divider>
        <v-card-text class="course-description">Description:<v-spacer></v-spacer>{{ course.description }}</v-card-text>
        <v-card-actions class="course-actions">
            <v-btn outlined color="#0b1c5b" :to="'/admin/edit/' + course.id" class="edit-btn">Edit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  computed: {
    courseStatus () {
      return this.course.status ? 'Yes' : 'No'
    },
    timelineItems () {
      return [
        { label: 'Cost', value: `$${this.course.cost}` },
        { label: 'Duration', value: this.course.duration },
        { label: 'Places', value: this.course.places },
        { label: 'Completed', value: this.courseStatus },
        { label: 'Registration Date', value: this.course.registrationDate }
      ]
    }
  }
}
</script>

<style scoped>
.course-card {
  width: 100%;
  max-width: 400px;
  margin: 16px auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: #fff;
}
/* hover animation */
.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
.v-timeline {
  margin: 0;
  padding: 0;
}
.v-timeline-item {
  padding: 0 0 10px;
  color: #0b1c5b
}
/* title styling */
.course-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: #0b1c5b;
  text-align: center;
  margin: 16px 0 8px;
}
/* course info styling */
.course-info {
  font-size: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 8px;
}
/* description styling */
.v-card-text, .course-description {
  font-size: 1rem;
  padding: 1rem;
  text-align: justify;
  color: #0b1c5b !important;
}
/* action button styling */
.course-actions {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
.edit-btn {
  font-weight: bold;
  text-transform: uppercase;
}
.edit-btn:hover {
  transform: scale(1.15);
}
@media (max-width: 600px) {
  .course-title {
    font-size: 1.2rem;
  }
  .course-info,
  .course-description {
    font-size: 0.9rem;
  }
  .edit-btn {
    font-size: 0.8rem;
  }
}
</style>
