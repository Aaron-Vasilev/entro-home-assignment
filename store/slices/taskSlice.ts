import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '@prisma/client'
import { RootState } from '..'
import { call } from '../../lib/axios'
import { Api } from '../../utils/consts'

interface TasksState {
  activeTask: Task | undefined
  tasks: Task[]
  relatedTasks: Task[]
  loading: boolean
  error: boolean
}

const initialState: TasksState = {
  activeTask: {
    id: 0,
    title: '',
    status: '',
    creationDate: '',
    assigneeName: '',
    assigneeAvatar: '',
  },
  tasks: [],
  relatedTasks: [],
  loading: false,
  error: false
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks.push(...action.payload)
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },
    setActiveTask: (state, action: PayloadAction<Task>) => {
      state.activeTask = action.payload
    },
    setRelatedTasks: (state, action: PayloadAction<Task[]>) => {
      state.relatedTasks = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
        state.loading = false
      })
      .addCase(createTask.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = [...action.payload] 
        state.loading = false
      })
      .addCase(getTasks.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(addRelatedTask.pending, (state) => {
        state.loading = true
      })
      .addCase(addRelatedTask.fulfilled, (state, action) => {
        state.relatedTasks.push(action.payload)
        state.loading = false
      })
      .addCase(addRelatedTask.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(pushRelatedTask.fulfilled, (state, action) => {
        state.relatedTasks = [action.payload, ...state.relatedTasks]
      })
  },
})

export const { 
  addTasks,
  setTasks, 
  setActiveTask,
  setRelatedTasks
} = taskSlice.actions

export const createTask = createAsyncThunk<Task, Task, { state: RootState }>(
  '/createTask',
  async (newTask, thunkApi) => {
    try {
      const relatedTaskIds = thunkApi.getState().tasks
                               .relatedTasks.map(task => task.id)
      const res = await call<Task>(Api.createTask, {
        task: newTask,
        relatedTaskIds
      })

      if (res.error) {
        thunkApi.rejectWithValue(res.error)
      } else {
        return res.data
      }
    } catch (e) {
      console.error('createTask Error', e)
    }
  }
)

export const getTasks = createAsyncThunk(
  '/getTasks',
  async (_, thunkApi) => {
    try {
      const res = await call<Task[]>(Api.getTasks)

      if (res.error) {
        thunkApi.rejectWithValue(res.error)
      } else {
        return res.data
      }
    } catch (e) {
      console.error('getTasks Error', e)
    }
  }
)

export const addRelatedTask = createAsyncThunk<Task, Task, { state: RootState }>(
  '/addRelatedTask',
  async (newRelatedTask, thunkApi) => {
    try {
      const data = {
        taskId: thunkApi.getState().tasks.activeTask.id,
        newRelationId: newRelatedTask.id 
      }

      const res = await call<Task>(Api.addRelatedTask, data)

      if (res.error) {
        thunkApi.rejectWithValue(res.error)
      } else {
        return newRelatedTask
      }
    } catch (e) {
      console.error('addRelatedTask Error', e)
    }
  }
)

export const pushRelatedTask = createAsyncThunk<Task, Task, { state: RootState }>(
  '/pushRelatedTask',
  async (newRelatedTask, thunkApi) => {
    return newRelatedTask
  }
)
