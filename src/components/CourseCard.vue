<template>
    <v-card class="course-card">
        <v-img :src="course.image" class="course-image" height="240px" contain></v-img>
        <v-card-title class="course-title">{{ course.name }}</v-card-title>
        <v-card-text class="course-description">{{ course.description }}</v-card-text>
        <v-card-actions class="course-actions">
            <v-btn text :to="'/admin/edit/' + course.id" class="edit-btn">Edit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: 'card-component',
  props: ['course']
}
</script>

<style scoped>
.course-card {
  /* mobile-first */
  width: 80%;
  margin: 10px auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
/* hover animation */
.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
}
/* responsive design for larger screens */
@media (max-width: 789px) and (max-width: 959px) {
  .course-card {
    width: 90%;
  }
}
@media (min-width: 1024px) {
  .course-card {
    width: 100%;
  }
}
/* styling for course image */
.course-image {
  height: auto; /* ensures responsiveness */
  width: 100%;
  object-fit: contain; /* maintain image proportions */
  transition: transform 0.3s ease;
}
/* Subtle zoom effect on image hover */
.course-card:hover .course-image {
  transform: scale(1.05);
}
/* title styling */
.course-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  padding: 0.5rem;
  text-align: center;
}
/* description styling */
.course-description {
  font-size: 1rem;
  color: #666;
  padding: 0.5rem 1rem;
  text-align: justify;
}
/* action button styling */
.course-actions {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
}
.edit-btn {
  color: #1976d2;
  font-weight: bold;
  text-transform: none;
  transition: color 0.3s ease;
}
.edit-btn:hover {
  color: #004ba0;
}
</style>
