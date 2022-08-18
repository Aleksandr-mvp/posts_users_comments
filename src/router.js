import {createRouter, createWebHistory} from 'vue-router'
import PostList from "@/views/PostList";
import PostAndUserInformation from "@/views/PostAndUserInformation";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'post-list',
            component: PostList,
        },
        {
            path: '/post/:id/user/:userId',
            name: 'post',
            component: PostAndUserInformation,

        },
    ]
})