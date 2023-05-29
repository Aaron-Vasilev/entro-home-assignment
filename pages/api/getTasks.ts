import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

async function getTasks(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await prisma.task.findMany()

    res.json(result)
  } catch (e) {
    console.log('createTaskHandle ERROR', e)
  }
}

export default getTasks
