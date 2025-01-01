<template>
  <div>
    <NavBar />
    <v-container class="text-center">
      <h1>Administration</h1>
      <v-btn class="addCourse ma-12" color="primary" @click="openAddModal">Add Course</v-btn>
      <v-data-table
        :items="formattedCourses"
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
            <!-- Informative Messages -->
            <v-row class="my-4">
        <v-col cols="12" sm="6" md="4">
          <v-card id="deep-purple">
            <v-card-title>
              <v-icon class="mr-4" color="#6A1B9A" size="40px">mdi-account-multiple</v-icon>
              Total Students Allowed:</v-card-title>
            <v-card-text id="nmbr-dp"><strong>{{ totalPlaces }}</strong></v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card id="light-blue">
            <v-card-title>
              <v-icon class="mr-4" color="#03A9F4" size="40px">mdi-account-check</v-icon>
              Total Enrolled Students:</v-card-title>
            <v-card-text id="nmbr-lb"><strong>{{ totalEnrolled }}</strong></v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card id="coral">
            <v-card-title>
              <v-icon class="mr-4" color="#FF1744" size="40px">mdi-account-plus</v-icon>
              Total Remaining Places:</v-card-title>
            <v-card-text id="nmbr-coral"><strong>{{ totalRemainingPlaces }}</strong></v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card id="pink">
            <v-card-title>
              <v-icon class="mr-4" color="#FF4081" size="40px">mdi-cancel</v-icon>
              Total Completed Courses:</v-card-title>
            <v-card-text id="nmbr-pink"><strong>{{ totalCompletedCourses }}</strong></v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card id="brown">
            <v-card-title>
              <v-icon class="mr-4" color="#827717" size="40px">mdi-bell-ring</v-icon>
              Total Active Courses:</v-card-title>
            <v-card-text id="nmbr-brown"><strong>{{ totalActiveCourses }}</strong></v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card id="orange">
            <v-card-title>
              <v-icon class="mr-4" color="#EF6C00" size="40px">mdi-bell-ring</v-icon>
              Total Courses:
            </v-card-title>
            <v-card-text id="nmbr-orange"><strong>{{ totalCourses }}</strong></v-card-text>
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
.status-button {
  color: white;
}
#deep-purple {
  border: 4px solid #6A1B9A;
  color: #6A1B9A;
}
#nmbr-dp {
  color: #6A1B9A;
  font-size: 2rem;
}
#light-blue {
  border: 4px solid #03A9F4;
  color: #03A9F4;
}
#nmbr-lb {
  color: #03A9F4;
  font-size: 2rem;
}
#coral {
  border: 4px solid #FF1744;
  color: #FF1744;
}
#nmbr-coral {
  color: #FF1744;
  font-size: 2rem;
}
#pink {
  border: 4px solid #FF4081;
  color: #FF4081;
}
#nmbr-pink {
  color: #FF4081;
  font-size: 2rem;
}
#brown {
  border: 4px solid #827717;
  color: #827717;
}
#nmbr-brown {
  color: #827717;
  font-size: 2rem;
}
#orange {
  border: 4px solid #EF6C00;
  color: #EF6C00;
}
#nmbr-orange {
  color: #EF6C00;
  font-size: 2rem;
}
</style>
