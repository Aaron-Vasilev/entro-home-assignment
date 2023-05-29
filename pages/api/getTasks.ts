import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

async function getTasks(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const tasks = await prisma.task.findMany()

    res.json(tasks)
  } catch (e) {
    console.log('createTaskHandle ERROR', e)
  }
}

export default getTasks
