import { Task } from '../prisma/generated'

export function currentTime(): string {
  const date = new Date()

  const optionsDate = { month: 'short', day: '2-digit', year: 'numeric' }
  const optionsTime = { hour: '2-digit', minute: '2-digit' }
  //@ts-ignore
  const formattedDate = date.toLocaleDateString('en-US', optionsDate)
  //@ts-ignore
  const formattedTime = date.toLocaleTimeString('en-US', optionsTime)

  return `${formattedDate} ${formattedTime}`
}

export function taskIsInRelatedTasks(relatedTasks: Task[], task: Task): boolean {
  const index = relatedTasks.findIndex(relatedTask => relatedTask.id === task.id)

  return index !== -1
}

export function isActiveTask(activeTask: Task, task: Task): boolean {
  return activeTask.id === task.id
}
