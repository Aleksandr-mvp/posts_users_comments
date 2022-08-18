<template>
  <div class="container-xl">
    <div class="mt-3 card-header d-flex">
      <div>
        <button class="btn btn-outline-dark" @click="$emit('notify_back')" @click.prevent="$router.back()">
          Назад
        </button>
      </div>
      <h5 class="ms-3 mt-2">Пост № {{ $route.params.id }}</h5>
    </div>
    <div v-if="dataLoading" class="d-flex justify-content-center">
      <div class="spinner-border text-secondary" role="status"></div>
    </div>
    <template v-else>
      <div class="row mt-3">
        <div class="col">
          <div class="text-center mb-1">Информация о посте</div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                {{ postInfo.title }}
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">
                {{ userInfo.name }}
              </h6>
              <p class="card-text">
                {{ postInfo.body }}
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="text-center mb-1">Информация о пользователе</div>
          <div class="card">
            <div class="card-body">
              <div class="form-group row">
                <label class="form-label col-3">
                  Имя:
                </label>
                <div class="col">
                  {{ userInfo.name }}
                </div>
              </div>

              <div class="form-group row">
                <label class="form-label col-3">
                  Email:
                </label>
                <div class="col">
                  {{ userInfo.email }}
                </div>
              </div>

              <div class="form-group row">
                <label class="form-label col-3">
                  Телефон:
                </label>
                <div class="col">
                  {{ userInfo.phone }}
                </div>
              </div>

              <div class="form-group row">
                <label class="form-label col-3">
                  Веб-сайт:
                </label>
                <div class="col">
                  {{ userInfo.website }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <div>Коментарии</div>
          <button @click="canEdit = !canEdit" type="button" class="mt-2 btn btn-primary">
            <span v-if="!canEdit">Добавить</span>
            <span v-else>Отменить</span>
          </button>

          <template v-if="canEdit">
            <form @submit.prevent="createComment">
              <div class="mt-3 mb-3">
                <label for="name" class="form-label">
                  Заголовок
                </label>
                <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Введите коментарий..."
                    autocomplete="off"
                >
              </div>

              <div class="mt-3 mb-3">
                <label for="email" class="form-label">
                  Email
                </label>
                <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Введите коментарий..."
                >
              </div>

              <div class="mt-3 mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Описание
                </label>
                <textarea
                    v-model="form.body"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                >
            </textarea>
              </div>
              <div>
                <button :disabled="disabled" type="submit" class="btn btn-primary">
                  <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Добавить коментарий
                </button>
              </div>
            </form>
          </template>

          <template v-if="!canEdit">
            <div v-for="comment in comments" class="card mt-2">
              <div class="card-body">
                <div @click="deleteComment(comment.id)" class="d-flex justify-content-end deleteBtn">
                  <div class="badge bg-danger">Удалить</div>
                </div>
                <div>{{ comment.name }}</div>
                <div>{{ comment.email }}</div>
                <div>{{ comment.body }}</div>
              </div>
            </div>
          </template>
          <div v-else class="h3">
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "PostAndUserInformation",
  data: () => ({
    postInfo: [],
    userInfo: [],
    comments: [],
    form: {
      name: '',
      email: '',
      body: ''
    },
    dataLoading: false,
    canEdit: false,
    loading: false,
    disabled: false
  }),
  computed: {
    ...mapState(
        [
          'COMMENTS',
          'POST_INFO',
          'USER_INFO',
          'NEW_COMMENTS'
        ]),
  },
  methods: {
    ...mapActions(
        [
          'GET_COMMENTS_POST',
          'GET_POST_INFO',
          'GET_USER_INFO',
          'CREATE_COMMENT'
        ]),
    createComment() {
      if (this.form.name && this.form.email && this.form.body !== '') {
        this.loading = !this.loading
        this.disabled = !this.disabled
        const id = this.$route.params.id
        const form = this.form
        this.CREATE_COMMENT({id: id, form: form}).then(response => {
          this.comments.unshift(this.NEW_COMMENTS)
          this.canEdit = !this.canEdit
          this.form.name = ''
          this.form.email = ''
          this.form.body = ''
          this.$notify({
            title: "Успешно",
            text: "Коментарий создан",
            type: "success"
          });
        }, error => {
          this.$notify({
            title: "Ошибка",
            text: "Коментарий не создан",
            type: "error"
          });
        }).finally(() => {
          this.loading = !this.loading
          this.disabled = !this.disabled
        })
      }
    },
    getPostInfo() {
      this.dataLoading = true
      this.GET_POST_INFO({id: this.$route.params.id}).then(response => {
        this.postInfo = this.POST_INFO
      }, error => {
        alert('Не удалось загрузить информацию о посте')
      }).finally(() => this.dataLoading = false)
    },
    getUserInfo() {
      this.dataLoading = true
      this.GET_USER_INFO({userId: this.$route.params.userId}).then(response => {
        this.userInfo = this.USER_INFO
      }, error => {
        alert('Не удалось загрузить информацию о пользователе')
      }).finally(() => this.dataLoading = false)
    },
    getCommentsPost() {
      this.dataLoading = true
      this.GET_COMMENTS_POST({id: this.$route.params.id}).then(response => {
        this.comments = this.COMMENTS
      }, error => {
        alert('Не удалось загрузить коментарии')
      }).finally(() => this.dataLoading = false)
    },
    deleteComment(commentId) {
      this.comments = this.comments.filter(item => item.id !== commentId)
    }
  },
  mounted() {
    this.getUserInfo()
    this.getPostInfo()
    this.getCommentsPost()
  }
}
</script>

<style scoped>
.deleteBtn {
  cursor: pointer;
}
</style>