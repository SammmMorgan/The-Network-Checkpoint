import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


function _paintPosts(drawSpecifics) {
    const posts = drawSpecifics.data.posts.map(pojos => new Post(pojos))
    AppState.posts = posts
    AppState.currentPage = drawSpecifics.data.page
    AppState.totalPages = drawSpecifics.data.totalPages
}

class PostService {

    async sendLike(postId) {
        // AppState.likes = null
        // TODO this fucker aint reactive; figure out why 
        const response = await api.post(`/api/posts/${postId}/like`)
        const updatedPost = AppState.posts.findIndex(foundPost => foundPost.id == postId)
        AppState.posts.splice(updatedPost, 1, response.data)
        logger.log(updatedPost)
    }

    async postByAccount(accountId) {
        const response = await api.get(`/api/posts?creatorId=${accountId}`)
        logger.log(response.data)
        _paintPosts(response)
    }


    async paintPosts() {
        const response = await api.get(`/api/posts`)
        logger.log(response.data)
        _paintPosts(response)
    }
}

export const postService = new PostService