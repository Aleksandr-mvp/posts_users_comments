<template>
  <div class="container-xl">
    <div class="row text-center mb-5">
      <h1>Список постов</h1>
    </div>
    <div v-if="dataLoading" class="d-flex justify-content-center">
      <div class="spinner-border text-secondary" role="status"></div>
    </div>
    <div v-else class="row">
      <div class="col">
        <div class="card">
          <ul class="list-group list-group-flush">
            <li v-for="post in filteredPosts" :key="post.id" class="list-group-item post">
              <router-link
                  :to="{name: 'post', params: { id: post.id, userId: post.userId  }}"
                  class="text-dark text-decoration-none"
              >
                {{ post.id }}. {{ post.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col">
        <select v-model="selectedUser" @change="getPosts()" class="form-select" aria-label="Default select example">
          <option :value="null">Выберите пользователя</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "PostList",
  data: () => ({
    posts: [],
    users: [],
    selectedUser: null,
    dataLoading: false,
  }),
  computed: {
    ...mapState(['POSTS', 'USERS']),
    filteredPosts() {
      if (this.selectedUser) return this.posts.filter(item => item.userId === this.selectedUser)
      return this.posts
    }
  },
  methods: {
    ...mapActions(['GET_POSTS', 'GET_USERS']),
    getPosts() {
      this.dataLoading = true
      this.GET_POSTS().then(response => {
        this.posts = this.POSTS
      }, error => {
        this.$notify({
          title: "Ошибка",
          text: "Неудалось загрузить посты",
          type: "error"
        });
      }).finally(() => this.dataLoading = false)
    },
    getUsers() {
      this.dataLoading = true
      this.GET_USERS().then(response => {
        this.users = this.USERS
      }, error => {
        this.$notify({
          title: "Ошибка",
          text: "Неудалось загрузить пользователей",
          type: "error"
        });
      }).finally(() => this.dataLoading = false)
    }
  },
  mounted() {
    this.getUsers()
    this.getPosts()
  }
}
</script>

<style scoped>
.post {
  display: block;
  cursor: pointer;
}

.post a {
  display: block;
}

.post:hover {
  background: #edeef0;
}

h1 {
  font-size: 72px;
  background: -webkit-linear-gradient(45deg, #09009f, #00ff95 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>