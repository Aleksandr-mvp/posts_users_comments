<template>
  <router-view/>
  <notifications position="bottom right"/>
</template>

<script>
import PostList from "@/views/PostList";

export default {
  name: 'App',
  components: {PostList},

}
</script>

<style>

</style>
