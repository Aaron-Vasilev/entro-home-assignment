import { Box, Grid, Text } from '@chakra-ui/react'
import { Task } from '../../prisma/generated'

interface Prop {
  task: Task
}

export function TaskDetail({ task }: Prop) {

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      justifyItems="start"
    >
      <Detail
        label="Status"
        value={task.status}
      />
      <Detail
        label="Date Created"
        value={task.creationDate.toString()}
      />
      <Detail
        label="Assignee"
        value={task.assigneeName}
      />
      <Box
        gridColumn="span 3"
        justifySelf="normal"
      >
        <Detail
          label="Description"
          value={task.description}
          size="L"
        />
      </Box>
    </Grid>
  )
}

interface Props {
  label: string
  value: string
  size?: 'L' | 'S'
}

function Detail({ label, value, size = 'S' }: Props) {
  let width: string
  let height: string
  let radius: string
  let px: string
  let py: string

  switch (size) {
    case 'S': {
      width = 'fit-content'
      height = 'auto'
      radius = '16px'
      px='12px'
      py='2px'
      break;
    }
    case 'L': {
      width = 'auto'
      height = '134px'
      radius = '10px'
      px = py = '16px'
      break;
    }
  }

  return (
    <Box
      p="16px"
    >
      <Text
        textColor="secondary.500"
        fontSize="13px"
        lineHeight="18px"
        mb="8px"
      >
        {label}
      </Text>
      <Box
        w={width}
        px={px}
        py={py}
        borderRadius={radius}
        minHeight={height}
        bg="primary.200"
        fontSize="13px"
      >
        {value}
      </Box>
    </Box>
  )
}
