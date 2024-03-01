<template>
    <div class="container">
        <section class="row">
            <div v-for="post in posts" :key="post.id" class="col-10">
                <div class="card text-start">
                    <h4 class="card-title">
                        <img class="creator-picture" :src="post.creator.picture" alt="">
                        {{ post.creator.name }}
                    </h4>
                    <img class="content-picture card-img" :src="post.imgUrl" alt="Title" />
                    <button @click="sendLike(post.id)"> like button :) {{ post.likeIds }}</button>
                </div>

            </div>
        </section>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postService } from '../services/PostService.js';

export default {
    setup() {
        return {
            posts: computed(() => AppState.posts),
            currentPage: computed(() => AppState.currentPage),
            totalPage: computed(() => AppState.totalPages),

            async sendLike(postId) {
                try {
                    logger.log(postId)
                    await postService.sendLike(postId)
                } catch (error) {
                    Pop.error(error)
                    logger.error(error)

                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.creator-picture {
    height: 7.3vh;
    width: 7.3vh;
    border-radius: 50%;
    object-fit: cover;
}

.content-picture {
    height: 400px;
    object-fit: cover;
}
</style>