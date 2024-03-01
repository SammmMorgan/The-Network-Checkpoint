<template>
  <div class="sidebar">
    <Sidebar />
  </div>
  <PostCards />
</template>

<script>
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { computed, onMounted } from 'vue';
import { postService } from '../services/PostService.js';
import { AppState } from "../AppState.js"



export default {
  setup() {
    onMounted(() => paintPosts())

    async function paintPosts() {
      try {
        await postService.paintPosts()
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
    return {
      posts: computed(() => AppState.post),
      currentPage: computed(() => AppState.currentPage),
      totalPage: computed(() => AppState.totalPages)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
}

.sidebar {
  height: 100%;
  width: 25%;
  position: sticky;
  top: 0;
  float: left;
  background-color: lightblue;
}

.home-card {
  width: clamp(500px, 50vw, 100%);

  >img {
    height: 20px;
    max-width: 20px;
    width: 100%;
    object-fit: contain;
    object-position: center;
  }
}
</style>
