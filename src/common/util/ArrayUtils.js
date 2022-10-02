class ArrayUtils {
  constructor() {
    throw new Error()
  }
  
  static chunks(arr = [], size) {
    const result = []
    let elements = []
    let count = 1
    for (const [idx, ele] of arr.entries()) {
      const isLastIdx = idx === arr.length - 1
      if (isLastIdx) {
        elements.push(ele)
        result.push(elements)
        break
      }

      if (count === size) {
        elements.push(ele)
        result.push(elements)
        elements = []
        count = 1
        continue
      } 
        
      elements.push(ele)
      count++
    }
    return result
  }
}

module.exports = ArrayUtils