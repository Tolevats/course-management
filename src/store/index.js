import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [
      {
        id: 1,
        image: 'https://i.blogs.es/545cf8/es6-logo/450_1000.png',
        name: 'Advanced JavaScript',
        cost: 30000,
        duration: '2 months',
        places: 20,
        enrolled: 10,
        status: false,
        registrationDate: '06/03/2022',
        description: 'Course with the new JavaScript updates.'
      },
      {
        id: 2,
        image: 'https://lineadecodigo.com/wp-content/uploads/2014/04/css.png',
        name: 'CSS for Beginners',
        cost: 10000,
        duration: '1 month',
        places: 35,
        enrolled: 23,
        status: false,
        registrationDate: '05/03/2022',
        description: 'Learning CSS styles from the most basic level.'
      },
      {
        id: 3,
        image: 'https://1000marcas.net/wp-content/uploads/2020/11/JavaScript-logo.jpg',
        name: 'Basic JavaScript from 0 to 100',
        cost: 20000,
        duration: '2 months',
        places: 25,
        enrolled: 0,
        status: true,
        registrationDate: '05/03/2022',
        description: 'Programming for the web with JavaScript.'
      },
      {
        id: 4,
        image: 'https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png',
        name: 'Basic HTML',
        cost: 10000,
        duration: '1 month',
        places: 35,
        enrolled: 0,
        status: true,
        registrationDate: '31/01/2022',
        description: 'Learn HTML 5 and create your first web pages step by step with dozens of exercises.'
      },
      {
        id: 5,
        image: 'https://logosandtypes.com/wp-content/uploads/2020/08/vue.svg',
        name: 'Vue JS from 0 to 100',
        cost: 85500,
        duration: '5 months',
        places: 35,
        enrolled: 35,
        status: false,
        registrationDate: '06/03/2022',
        description: 'Learn from scratch how to use VueJS, how to use it in small applications and see what the framework offers.'
      },
      {
        id: 6,
        image: 'https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png',
        name: 'Styles with SASS',
        cost: 45000,
        duration: '1 month',
        places: 40,
        enrolled: 35,
        status: false,
        registrationDate: '06/03/2022',
        description: 'With SASS you will learn to write better CSS code with all the necessary functions.'
      }
    ]
  },
  getters: {
    totalCourses: (state) => state.courses.length,
    totalActiveCourses: (state) =>
      state.courses.filter((course) => !course.status).length,
    totalCompletedCourses: (state) =>
      state.courses.filter((course) => course.status).length,
    totalEnrolled: (state) =>
      state.courses.reduce((sum, course) => sum + course.enrolled, 0),
    totalPlaces: (state) =>
      state.courses.reduce((sum, course) => sum + course.places, 0),
    totalRemainingPlaces: (state) =>
      state.courses.reduce((sum, course) => sum + (course.places - course.enrolled), 0),
    getCourseById: (state) => (id) => {
      return state.courses.find(course => course.id === id)
    }
  },
  mutations: {
    ADD_COURSE (state, course) {
      state.courses.push(course)
    },
    DELETE_COURSE (state, courseId) {
      state.courses = state.courses.filter((course) => course.id !== courseId)
    },
    EDIT_COURSE (state, updatedCourse) {
      const index = state.courses.findIndex(course => course.id === updatedCourse.id)
      if (index !== -1) state.courses.splice(index, 1, updatedCourse)
    }
  },
  actions: {
    addCourse ({ commit }, course) {
      commit('ADD_COURSE', course)
    },
    deleteCourse ({ commit }, courseId) {
      commit('DELETE_COURSE', courseId)
    },
    editCourse ({ commit }, course) {
      commit('EDIT_COURSE', course)
    },
    updateCourse ({ commit }, updatedCourse) {
      commit('EDIT_COURSE', updatedCourse)
    }
  },
  modules: {
  }
})
