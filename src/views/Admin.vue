<template>
  <div>
    <NavBar />
    <v-container class="text-center">
      <h1 class="font-weight-bold">Administration</h1>
      <v-btn class="addCourse ma-12" color="primary" @click="openAddModal">Add Course</v-btn>
      <v-row class="mx-4" justify="center">
        <v-col cols="12">
          <!-- Responsive Container -->
          <div class="table-container">
            <v-data-table
            :items="formattedCourses"
            :headers="headers"
            item-value="id"
            class="elevation-4"
            dense
            hide-default-footer
            >
              <template v-slot:[`item.cost`]="{ item }">
                <v-chip color="success" text>
                  $ {{ item.cost }}
                </v-chip>
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip
                  :color="item.status ? 'light-blue' : 'brown lighten-3'"
                  text
                >
                  {{ item.status ? 'Yes' : 'No' }}
                </v-chip>
              </template>
              <template v-slot:[`item.registrationDate`]="{ item }">
                <v-chip color="success">
                  {{ item.registrationDate }}
                </v-chip>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-row dense justify="space-between" align="center" class="action-buttons">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn @click="editCourse(item.id)" v-bind="attrs" v-on="on" class="mt-4 responsive-btn">
                        <v-icon color="orange">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit Course</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn @click="deleteCourse(item.id)" v-bind="attrs" v-on="on" class="my-4 responsive-btn">
                        <v-icon color="red">mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Delete Course</span>
                  </v-tooltip>
                </v-row>
              </template>
            </v-data-table>
          </div>
        </v-col>
      </v-row>

      <AddCourseModal v-model="isAddModalOpen" />
      <!-- STATS -->
      <v-row class="mx-4">
        <v-col cols="12" sm="6" md="4" v-for="(stat, index) in stats" :key="index">
          <v-card :style="{ border: `2px solid ${stat.color}` }">
            <v-card-title class="d-flex flex-column text-h6">
              <v-icon class="mr-4" :color="stat.iconColor" size="40px">{{ stat.icon }}</v-icon>
              <span :style="{ color: stat.color }" class="text-wrap">{{ stat.title }}</span>
            </v-card-title>
            <v-card-text class="text-h4 font-weight-bold" :style="{ color: stat.color }">{{ stat.value }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- pop-up to confirm deletion -->
      <v-dialog v-model="isDeleteDialogOpen" max-width="400px">
        <v-card>
          <v-card-title>Confirm</v-card-title>
          <v-card-text>Are you sure you want to delete this course?</v-card-text>
          <v-card-actions>
            <v-btn color="grey" text @click="cancelDelete">Cancel</v-btn>
            <v-btn color="red" @click="confirmDelete">Accept</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import NavBar from '@/components/Navbar.vue'
import AddCourseModal from '../components/AddCourseModal.vue'

export default {
  name: 'admin-view',
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
    ],
    isDeleteDialogOpen: false,
    courseToDelete: null
  }),
  computed: {
    ...mapState(['courses']),
    ...mapGetters([
      'totalCourses',
      'totalPlaces',
      'totalEnrolled',
      'totalRemainingPlaces',
      'totalCompletedCourses',
      'totalActiveCourses'
    ]),
    formattedCourses () {
      return this.courses.map(course => ({
        ...course,
        registrationDate: this.formatDate(course.registrationDate)
      }))
    },
    stats () {
      return [
        { title: 'Total Students Allowed:', value: this.totalPlaces, color: '#6A1B9A', icon: 'mdi-account-multiple', iconColor: '#6A1B9A' },
        { title: 'Total Enrolled Students:', value: this.totalEnrolled, color: '#03A9F4', icon: 'mdi-account-check', iconColor: '#03A9F4' },
        { title: 'Total Remaining Places:', value: this.totalRemainingPlaces, color: '#FF1744', icon: 'mdi-account-plus', iconColor: '#FF1744' },
        { title: 'Total Completed Courses:', value: this.totalCompletedCourses, color: '#FF4081', icon: 'mdi-cancel', iconColor: '#FF4081' },
        { title: 'Total Active Courses:', value: this.totalActiveCourses, icon: 'mdi-bell-ring', color: '#827717', iconColor: '#827717' },
        { title: 'Total Courses:', value: this.totalCourses, color: '#EF6C00', icon: 'mdi-bell-ring', iconColor: '#EF6C00' }
      ]
    }
  },
  methods: {
    ...mapActions(['deleteCourse']),
    openAddModal () {
      this.isAddModalOpen = true
    },
    editCourse (id) {
      if (!this.$store.state.courses || this.$store.state.courses.length === 0) {
        this.$store.dispatch('fetchCourses').then(() => {
          this.$router.push(`/admin/edit/${id}`)
        })
      } else {
        this.$router.push(`/admin/edit/${id}`)
      }
    },
    deleteCourse (id) {
      this.courseToDelete = id
      this.isDeleteDialogOpen = true
    },
    cancelDelete () {
      this.isDeleteDialogOpen = false
      this.courseToDelete = null
    },
    confirmDelete () {
      this.$store.dispatch('deleteCourse', this.courseToDelete) // dispatch the delete action
        .then(() => {
          this.isDeleteDialogOpen = false
          this.courseToDelete = null
        })
        .catch(error => { // handle error
          console.error('Error deleting course:', error)
        })
    },
    formatDate (dateString) {
      if (!dateString) return 'Invalid Date'
      const [day, month, year] = dateString.split('/')
      return `${day}/${month}/${year}`
    }
  },
  components: { NavBar, AddCourseModal }
}
</script>

<style scoped>
.table-container {
  padding-bottom: 1rem;
}
.v-data-table {
  color: #0c1c5a;
  border: 2px solid #0c1c5a;
}
.v-chip {
  color: white;
  margin: 6px 0;
}
.addCourse {
  font-size: 1rem;
  font-weight: bold;
}
.status-button {
  color: white;
}
.v-card {
  transition: transform 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.v-card:hover {
  transform: scale(1.05);
}
.text-wrap {
  white-space: normal; /* allow text to wrap */
  overflow-wrap: break-word; /* ensure long words break */
}
.action-buttons {
  flex-wrap: wrap;
}

.responsive-btn {
  display: inline-block;
}

@media (min-width: 960px) {
  .responsive-btn {
    display: block; /* make buttons stack vertically for md screens */
    width: 100%; /* ensure full width for block layout */
  }
}
</style>
