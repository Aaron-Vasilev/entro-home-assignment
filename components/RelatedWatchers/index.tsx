import { Box } from "@chakra-ui/react";
import { Task } from '@prisma/client'

interface Props {
  relatedTasks: Task[]
  watchers: []
}

export function RelatedWatchers({  }: Props) {

  return (
    <Box>
    </Box>
  )
}
