class PromiseUtils {
  constructor() {
    throw new Error()
  }

  static waitFor(milliSeconds) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, milliSeconds)
    })
  }
}

module.exports = PromiseUtils