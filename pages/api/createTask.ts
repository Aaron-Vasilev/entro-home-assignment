import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function createTaskHandle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      task: {
        title, 
        assigneeName, 
        status,
        creationDate,
      }, 
      relatedTaskIds, 
      watchers, 
    } = req.body
    console.log('† line 15 req.body', req.body)

    const result = await prisma.task.create({
      data: {
        title,
        assigneeName,
        status,
        assigneeAvatar: 'https://entro.security/wp-content/uploads/2023/05/entro-footer-icon.svg',
        creationDate,
        TaskRelation: {
          create: {
            relatedTasks: relatedTaskIds,
            watchers,
          }
        }
      },
    })

    res.json(result)
  } catch (e) {
    console.log('createTaskHandle ERROR', e)
  }
}

