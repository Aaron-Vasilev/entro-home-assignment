import type { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'

export default async function createTaskHandle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, assigneeName, status } = req.body as Task 

    const result = await prisma.task.create({
      data: {
        title,
        assigneeName,
        assigneeAvatar: '',
        status,
      },
    })

    console.log('† line 19 result', result)
    res.json(result)
  } catch (e) {
    console.log('createTaskHandle ERROR', e)
  }
}

