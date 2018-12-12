/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-useless-path-segments */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/users/Register.vue';
import Login from './views/users/Login.vue';
import Class from './views/classes/Class.vue';
import AdminDashboard from './views/dashboards/AdminDashboard.vue';
import ListUsers from './views/list/admin/ListUsers.vue';
import EditUser from './views/edit/EditUser.vue';
import ListQuiz from './views/list/admin/ListQuiz.vue';
import ListClasses from './views/list/admin/ListClasses.vue';
import StudentDashboard from './views/dashboards/StudentDashboard.vue';
import InstructorDashboard from './views/dashboards/InstructorDashboard.vue';
import ListClassesInstructor from './views/list/instructor/ListClassesInstructor.vue';
import CreateClass from './views/creator/CreateClass.vue';
import CreateQuiz from './views/creator/CreateQuiz.vue';
import ListQuizzesInstructor from './views/list/instructor/ListQuizzesInstructor.vue';
import QuizDashboard from './views/dashboards/QuizDashboard.vue';
import ResultDashboard from './views/dashboards/ResultDashboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/adminDashboard',
      name: 'adminDashboard',
      component: AdminDashboard,
    },
    {
      path: '/listUsers',
      name: 'listUsers',
      component: ListUsers,
    },
    {
      path: '/users/:userId/edit',
      name: 'usersEdit',
      component: EditUser,
    },
    {
      path: '/listClasses',
      name: 'listClasses',
      component: ListClasses,
    },
    {
      path: '/listQuiz',
      name: 'listQuiz',
      component: ListQuiz,
    },
    {
      path: '/studentDashboard',
      name: 'studentDashboard',
      component: StudentDashboard,
    },
    {
      path: '/instructorDashboard',
      name: 'instructorDashboard',
      component: InstructorDashboard,
    },
    {
      path: '/listClassesInstructor',
      name: 'listClassesInstructor',
      component: ListClassesInstructor,
    },
    {
      path: '/listQuizzesInstructor',
      name: 'listQuizzesInstructor',
      component: ListQuizzesInstructor,
    },
    {
      path: '/createClass',
      name: 'createClass',
      component: CreateClass,
    },
    {
      path: '/createQuiz',
      name: 'createQuiz',
      component: CreateQuiz,
    },
    {
      path: '/class',
      name: 'class',
      component: Class,
    },
    {
      path: '/quizDashboard',
      name: 'quizDashboard',
      component: QuizDashboard,
    },
    {
      path: '/resultDashboard',
      name: 'resultDashboard',
      component: ResultDashboard,
    },
  ],
});
