const PostService = require('../common/service/PostService')
const ValueUtils = require('../common/util/ValueUtils')

async function searchPosts() {
  const postService = PostService.getInstance()
  try {
    const list = await postService.list()
    return list
  } catch (err) {
    throw err
  }
}

async function editPost(id, item) {
  try {
    const postService = PostService.getInstance()
    const response = await postService.edit(id, item)
    return response
  } catch (err) {
    throw err
  }  
}

const resultMap = new Map()
async function start() {
  const list = await searchPosts()
  const chunks = ValueUtils.chunks(list, 40)
  for await (const arr of chunks) {
    const res = await Promise.all(arr.map(item => {
      const obj = {
        ...item, 
        title: item.title + '@'
      }
      return editPost(item.id, obj)
    }))

    console.log('res:', res)

    res.forEach(item => {
      resultMap.set(item.id, item)
    })
  }
}

start()