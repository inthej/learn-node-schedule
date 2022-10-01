const axios = require('axios')

class ApiService {
  static #instance
  #url = 'https://jsonplaceholder.typicode.com'

  static getInstance() {
    if (!this.#instance) {
      
      this.#instance = new ApiService()
    }
    return this.#instance
  }

  async posts() {
    try {
      const path = this.#url + '/posts'
      const response = await axios.get(path)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async commonets() {
    try {
      const path = this.#url + '/commnets'
      const response = await axios.get(path)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async albums() {
    try {
      const path = this.#url + '/albums'
      const response = await axios.get(path)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async photos() {
    try {
      const path = this.#url + '/photos'
      const response = axios.get(path)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async todos() {
    try {
      const path = this.#url + '/todos'
      const response = await axios.get(path)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async users() {
    try {
      const path = this.#url + '/users'
      const response = await axios.get(path)
      return response.data
    } catch (err) {
      throw err
    }
  }
}

module.exports = ApiService