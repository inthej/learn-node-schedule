const schedule = require('node-schedule')
const PostService = require('../common/service/PostService')
const ValueUtils = require('../common/util/ValueUtils')
const ArrayUtils = require('../common/util/ArrayUtils')
const PromiseUtils = require('../common/util/PromiseUtils')

/* 스케줄러 */

module.exports = () => {
  const rule = createRecurrenceRule({ second: 0 })
  scheduleJob(rule)
}

function createRecurrenceRule({ dayOfWeek, hour, minute, second }) {
  const rule = new schedule.RecurrenceRule()
  if (ValueUtils.nonEmpty(dayOfWeek)) rule.dayOfWeek = dayOfWeek
  if (ValueUtils.nonEmpty(hour)) rule.hour = hour
  if (ValueUtils.nonEmpty(minute)) rule.minute = minute
  if (ValueUtils.nonEmpty(second)) rule.second = second
  return rule
}

function scheduleJob(rule) {
  const run = () => {
    updatePostTitleJob()
    createClonePostJob()
  }
  schedule.scheduleJob(rule, run)
}

async function updatePostTitleJob() {
  console.log('start updatePostTitleJob')
  try {
    const postService = PostService.getInstance()
    const list = await postService.list()
    const chunks = ArrayUtils.chunks(list, 20)
    for await (const [idx, arr] of chunks.entries()) {
      const count = idx + 1
      const isLastIdx = idx === chunks.length - 1
      console.log(`start updatePostTitleJob count: ${count}`)
      await Promise.all(arr.map(item => {
        const obj = {
          ...item, 
          title: item.title + '@'
        }
        return postService.edit(item.id, obj)
      }))
      console.log(`end updatePostTitleJob count: ${count}`)

      if (isLastIdx) {
        break
      }

      console.log('wait updatePostTitleJob')
      await PromiseUtils.waitFor(1000)
    }
    console.log('end updatePostTitleJob')
  } catch (err) {
    console.log('updatePostTitleJob err:', err)
    return err
  }
}

async function createClonePostJob() {
  console.log('start createClonePostJob')
  try {
    const postService = PostService.getInstance()
    const list = await postService.list()
    const chunks = ArrayUtils.chunks(list, 20)
    for await (const [idx, arr] of chunks.entries()) {
      const count = idx + 1
      const isLastIdx = idx === chunks.length - 1
      console.log(`start createClonePostJob count: ${count}`)
      await Promise.all(arr.map(item => postService.create(item)))
      console.log(`end createClonePostJob count: ${count}`)

      if (isLastIdx) {
        break
      }

      console.log('wait createClonePostJob')
      await PromiseUtils.waitFor(2000)
    }
    console.log('end createClonePostJob')
  } catch (err) {
    console.log('createClonePostJob err:', err)
    return err
  }
}