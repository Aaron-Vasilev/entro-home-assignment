import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function createTaskHandle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, assigneeName, status, relatedTasks, watchers } = req.body

    const result = await prisma.task.create({
      data: {
        title,
        assigneeName,
        status,
        assigneeAvatar: 'https://entro.security/wp-content/uploads/2023/05/entro-footer-icon.svg',
        TaskRelation: {
          create: {
            relatedTasks,
            watchers,
          }
        }
      },
    })

    console.log('† line 19 result', result)
    res.json(result)
  } catch (e) {
    console.log('createTaskHandle ERROR', e)
  }
}

