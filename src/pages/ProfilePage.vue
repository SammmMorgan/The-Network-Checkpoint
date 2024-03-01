<template>
    <Sidebar />
    <div v-if="profile" class="card text-start">
        <img class="card-img-top" src="holder.js/100px180/" alt="Title" />
        <div class="card-body">
            <img class="profile-picture" :src="profile.picture" alt="">
            <h4 class="card-title">Title</h4>
            <p class="card-text">Body</p>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { profileService } from '../services/ProfileService.js';
import { useRoute } from 'vue-router';
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
        onMounted(() => {
            logger.log('do i run')
            _paintProfile();
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
    position: fixed;
    border-radius: 50%;
    object-fit: cover;
}
</style>