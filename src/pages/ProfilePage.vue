<template>
    <Sidebar />
    <div v-if="profile" class="card text-start">
        <img class="card-img-top backsplash" :src="profile.coverImg" alt="Title" />
        <div class="card-body">
            <div class="container">
                <section class="row">
                    <div class="col-6 mt-1">
                        <img class="profile-picture" :src="profile.picture" alt="">
                        <h4 class="card-title">{{ profile.name }}</h4>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <p role="button" class="fs-1 text-end px-3">
                            <i v-if="profile.graduated" class="mdi mdi-account-school" title="Alumni"></i>
                            <i v-else class="mdi mdi-book-variant" title="Current Student"></i>
                        </p>
                        <p role="button" :title="profile.gitHub" class="fs-1 text-end px-3"><i class="mdi mdi-github"></i>
                        </p>
                        <p role="button" :title="profile.linkedIn" class="fs-1 text-end px-3"><i
                                class="mdi mdi-linkedin"></i></p>
                        <p role="button" :title="profile.gitHub" class="fs-1 text-end px-3"><i class="mdi mdi-text-box"></i>
                        </p>
                    </div>
                </section>
                <p class="card-text">{{ profile.bio }}</p>
            </div>

        </div>
    </div>


    <div>


    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { profileService } from '../services/ProfileService.js';
import { useRoute } from 'vue-router';
import { postService } from '../services/PostService.js';

export default {
    setup() {
        const route = useRoute()
        async function _paintProfile() {
            try {
                const profileId = route.params.ProfId
                logger.log('profile id', profileId)
                await profileService.paintProfile(profileId)
            } catch (error) {
                Pop.error(error)
                logger.error(error)
            }
        }
        async function paintAccountPosts() {
            try {
                debugger
                await postService.postByAccount(profile.name)
            } catch (error) {
                Pop.error(error)
                logger.error(error)

            }
        }
        onMounted(() => {
            _paintProfile();
            paintAccountPosts()

        }
        )
        return {
            profile: computed(() => AppState.currentProfile),
        }
    }
};
</script>


<style lang="scss" scoped>
.profile-picture {
    height: 12vh;
    width: 12vh;
    position: relative;
    border-radius: 50%;
    object-fit: cover;
}

.backsplash {
    object-fit: cover;
    height: 40vh;
    width: 100%;
}
</style>