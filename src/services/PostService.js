import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


function _paintPosts(drawSpecifics) {
    const posts = drawSpecifics.data.posts.map(pojos => new Post(pojos))
    AppState.post = posts
    AppState.currentPage = drawSpecifics.data.page
    AppState.totalPages = drawSpecifics.data.totalPages
}

class PostService {





    async paintPosts() {
        const response = await api.get(`/posts`)
        logger.log(response.data)
        _paintPosts(response)
    }
}

export const postService = new PostService