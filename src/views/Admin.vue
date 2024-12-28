<template>
  <div>
    <NavBar />
    <v-container class="text-center">
      <h1>Administration</h1>
      <v-btn class="addCourse ma-12" color="primary" @click="openAddModal">Add Course</v-btn>
      <v-data-table
        :items="courses"
        :headers="headers"
        item-value="id"
        class="elevation-1">
        <template v-slot:[`item.cost`]="{ item }">
          <v-btn class="cost-button" color="success" rounded>
            ${{ item.cost }}
          </v-btn>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-btn class="status-button"
            :color="item.status ? 'light-blue' : 'brown lighten-3'"
            rounded
          >
            {{ item.status ? 'Yes' : 'No' }}
          </v-btn>
        </template>
        <template v-slot:[`item.registrationDate`]="{ item }">
          <v-btn class="date-button" color="success" rounded>
            {{ item.registrationDate }}
          </v-btn>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-row>
            <v-col cols="12" md="auto">
              <v-btn @click="editCourse(item.id)">
                <v-icon color="orange">mdi-pencil</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" md="auto">
              <v-btn @click="deleteCourse(item.id)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
      <AddCourseModal v-model="isAddModalOpen" />
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NavBar from '@/components/Navbar.vue'
import AddCourseModal from '../components/AddCourseModal.vue'

export default {
  name: 'admin-view',
  // props: {},
  data: () => ({
    isAddModalOpen: false,
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Places', value: 'places' },
      { text: 'Enrolled', value: 'enrolled' },
      { text: 'Duration', value: 'duration' },
      { text: 'Cost', value: 'cost' },
      { text: 'Status', value: 'status' },
      { text: 'Date', value: 'registrationDate' },
      { text: 'Actions', value: 'action' }
    ]
  }),
  computed: mapState(['courses']),
  methods: {
    ...mapActions(['deleteCourse']),
    openAddModal () {
      this.isAddModalOpen = true
    },
    editCourse (id) {
      this.$router.push(`/edit/${id}`)
    }
  },
  // watch: {},
  components: { NavBar, AddCourseModal }
}
</script>

<style scoped>
.status-button {
  color: white;
}
@media (max-width: 835px) {
  .v-data-table .v-btn {
    width: 100%; /* Make buttons full width on smaller screens */
  }
}

</style>
