const Rx = require('rxjs')
const PostService = require('../../common/service/PostService')

/* Observable 리스트 호출 */

const searchList = () => {
  const postService = PostService.getInstance()
  return Rx.from(postService.list())
}

const searchList$ = searchList()
searchList$.subscribe({
  next: (data) => {
    console.log('data:', data)
  },
  complete: () => {
    console.log('complete')
  },
  error: () => {
    console.log('error')
  }
})
