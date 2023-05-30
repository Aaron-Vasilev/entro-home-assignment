import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function addRelatedTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { newRelationId, taskId } = req.body

    const updatedTaskRelation = await prisma.taskRelation.update({
      where: { id: taskId },
      data: {
        relatedTasks: {
          push: newRelationId
        }
      }
    })

    res.json(updatedTaskRelation)
  } catch (e) {
    console.log('addRelatedTask ERROR', e)
  }
}


