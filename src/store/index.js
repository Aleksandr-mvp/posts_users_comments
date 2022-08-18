import {createStore} from 'vuex'
import axios from "axios";

const store = createStore({
    state() {
        return {
            POSTS: [],
            USERS: [],
            COMMENTS: [],
            NEW_COMMENTS: [],
            POST_INFO: [],
            USER_INFO: [],
        }
    },

    mutations: {
        SET_DATA_POSTS: (state, payload) => state.POSTS = payload,
        SET_DATA_USERS: (state, payload) => state.USERS = payload,
        SET_DATA_COMMENTS_POST: (state, payload) => state.COMMENTS = payload,
        SET_DATA_POST_INFO: (state, payload) => state.POST_INFO = payload,
        SET_DATA_USER_INFO: (state, payload) => state.USER_INFO = payload,
        SET_DATA_NEW_COMMENTS: (state, payload) => state.NEW_COMMENTS = payload,
    },

    actions: {
        async GET_POSTS({commit}) {
            return await axios.get('https://jsonplaceholder.typicode.com/posts')
                .then((response) => {
                    commit('SET_DATA_POSTS', response.data)
                    return response;
                }).catch(error => {
                    return error;
                });
        },
        async GET_USERS({commit}) {
            return await axios.get('https://jsonplaceholder.typicode.com/users')
                .then((response) => {
                    commit('SET_DATA_USERS', response.data)
                    return response;
                }).catch(error => {
                    return error;
                });
        },
        async GET_COMMENTS_POST({commit}, payload) {
            return await axios.get(`https://jsonplaceholder.typicode.com/posts/${payload.id}/comments`)
                .then((response) => {
                    commit('SET_DATA_COMMENTS_POST', response.data)
                    return response;
                }).catch(error => {
                    return error;
                });
        },
        async GET_POST_INFO({commit}, payload) {
            return await axios.get(`https://jsonplaceholder.typicode.com/posts/${payload.id}`)
                .then((response) => {
                    commit('SET_DATA_POST_INFO', response.data)
                    return response;
                }).catch(error => {
                    return error;
                });
        },
        async GET_USER_INFO({commit}, payload) {
            return await axios.get(`https://jsonplaceholder.typicode.com/users/${payload.userId}`)
                .then((response) => {
                    commit('SET_DATA_USER_INFO', response.data)
                    return response;
                }).catch(error => {
                    return error;
                });
        },
        async CREATE_COMMENT({commit}, payload) {
            return await axios.post(`https://jsonplaceholder.typicode.com/comments`, {
                name: payload.form.name,
                email: payload.form.email,
                body: payload.form.body,
                postId: payload.id,
            })
                .then((response) => {
                    commit('SET_DATA_NEW_COMMENTS', response.data)
                    return response;
                }).catch(error => {
                    return error;
                });
        },
        async DELETE_COMMENT({commit}, payload) {
            return await axios.delete(`https://jsonplaceholder.typicode.com/comments${payload.id}`,)
                .then((response) => {
                    commit(response.data)
                    return response;
                }).catch(error => {
                    return error;
                });
        },

    },

    getters: {}
})

export default store