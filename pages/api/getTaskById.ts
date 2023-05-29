import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

async function getTaskById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: +req.body.taskId
      }
    })

    res.json(task)
  } catch (e) {
    console.log('createTaskHandle ERROR', e)
  }
}

export default getTaskById
