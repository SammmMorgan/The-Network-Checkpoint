import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Post.js').Post[]} */
  posts: [],

  currentPage: 0,
  totalPages: 0,

  /** @type {import('./models/Profile.js').Profile{}} */
  currentProfile: {}


})
