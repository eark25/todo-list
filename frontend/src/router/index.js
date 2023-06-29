import { createWebHistory, createRouter } from 'vue-router';
import ShowTodos from '@/components/ShowTodos';
import CreateTodo from '@/components/CreateTodo';
// import ShowTodo from '@/components/ShowTodo';
// import EditTodo from '@/components/EditTodo';

const routes = [
    {
        path: '/',
        alias: '/todos',
        name: 'show-todos',
        component: ShowTodos
    },
    {
        path: '/',
        alias: '/todos',
        name: 'create-todo',
        component: CreateTodo
    },
    // {
    //     path: '/todos/:id',
    //     name: 'show-todo',
    //     component: ShowTodo
    // },
    // {
    //     path: '/todos/:id/edit',
    //     name: 'edit-todo',
    //     component: EditTodo
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;