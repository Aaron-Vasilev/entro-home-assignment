import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

async function getTaskRelation(req: NextApiRequest, res: NextApiResponse) {
  try {
    const taskWithRelatedTasks = await prisma.task.findUnique({
      where: {
        id: +req.body.taskId,
      },
      include: {
          TaskRelation: true
      },
    })

    const relatedTasks = await prisma.task.findMany({
      where: {
        id: {
          in: taskWithRelatedTasks.TaskRelation.relatedTasks
        },
      },
    })

    res.json(relatedTasks)
  } catch (e) {
    console.log('getTaskRelation ERROR', e)
  }
}

export default getTaskRelation
