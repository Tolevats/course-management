import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [
      {
        id: 1,
        image: 'https://i.blogs.es/545cf8/es6-logo/450_1000.png',
        name: 'JavaScript Avanzado',
        cost: 30000,
        duration: '2 meses',
        places: 20,
        enrolled: 10,
        status: false,
        registrationDate: '06/03/2022',
        description: 'Curso con las nuevas actualizaciones de JavaScript.'
      },
      {
        id: 2,
        image: 'https://lineadecodigo.com/wp-content/uploads/2014/04/css.png',
        name: 'CSS para principiantes',
        cost: 10000,
        duration: '1 mes',
        places: 35,
        enrolled: 23,
        status: false,
        registrationDate: '05/03/2022',
        description: 'Aprendiendo estilos con CSS desde el nivel más básico.'
      },
      {
        id: 3,
        image: 'https://1000marcas.net/wp-content/uploads/2020/11/JavaScript-logo.jpg',
        name: 'JavaScript Básico de 0 a 100',
        cost: 20000,
        duration: '2 meses',
        places: 25,
        enrolled: 0,
        status: true,
        registrationDate: '05/03/2022',
        description: 'Programando para la web con JavaScript.'
      },
      {
        id: 4,
        image: 'https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png',
        name: 'HTML Básico',
        cost: 10000,
        duration: '1 mes',
        places: 35,
        enrolled: 0,
        status: true,
        registrationDate: '31/01/2022',
        description: 'Aprende HTML 5 y crea tus primeras páginas web paso a paso con decenas de ejercicios.'
      },
      {
        id: 5,
        image: 'https://logosandtypes.com/wp-content/uploads/2020/08/vue.svg',
        name: 'Vue JS de 0 a 100',
        cost: 85500,
        duration: '5 meses',
        places: 35,
        enrolled: 35,
        status: false,
        registrationDate: '06/03/2022',
        description: 'Aprende desde cero como usar VueJS, cómo usarlo en aplicaciones pequeñas y ver lo que ofrece el framework.'
      },
      {
        id: 6,
        image: 'https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png',
        name: 'Estilos con SASS',
        cost: 45000,
        duration: '1 mes',
        places: 40,
        enrolled: 35,
        status: false,
        registrationDate: '06/03/2022',
        description: 'Con SASS aprenderás a escribir mejor código de CSS con todas las funciones necesarias.'
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
