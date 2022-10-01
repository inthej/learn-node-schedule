const axios = require('axios')

class PostService {
  static #instance
  #url = 'https://jsonplaceholder.typicode.com'

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new PostService()
    }
    return this.#instance
  }

  async list() {
    try {
      const path = this.#url + `/posts`
      const response = await axios.get(path)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async get(id) {
    try {
      const path = this.#url + `/posts/${id}`
      const response = await axios.get(path)
      return response.data
    } catch (err) {
      throw err
    }
  }

  /**
   * 
   * @param {*} form { id: 1, title: '...', body: '...', userId: 1 }
   */
   async create(form) {
    try {
      const path = this.#url + '/posts'
      const response = await axios.post(path, form)
      return response.data
    } catch (err) {
      throw err
    }
  }

  /**
   * 
   * @param {*} id 
   * @param {*} form { id: 1, title: '...', body: '...', userId: 1 }
   */
   async edit(id, form) {
    try {
      const path = this.#url + `/posts/${id}`
      const response = await axios.put(path, form)
      return response.data
    } catch (err) {
      throw err
    }
  }

  /**
   * 
   * @param {*} id 
   * @param {*} form 
   * @returns 
   */
   async fix(id, form) {
    try {
      const path = this.#url + `/posts/${id}`
      const response = await axios.patch(path, form)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async delete(id) {
    try {
      const path = this.#url + `/posts/${id}`
      const response = await axios.delete(path)
      return response.data
    } catch (err) {
      throw err
    }
  }
}

module.exports = PostService