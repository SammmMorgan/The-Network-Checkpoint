import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {

    async paintProfile(profId) {
        const response = await api.get(`api/profiles/${profId}`)
        // logger.log(response)
        const openProfile = new Profile(response.data)
        AppState.currentProfile = openProfile
    }
}

export const profileService = new ProfileService