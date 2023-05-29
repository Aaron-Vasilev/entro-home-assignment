import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '@prisma/client'
import { RootState } from '..'
import { call } from '../../lib/axios'

interface TasksState {
  tasks: Task[]
  loading: boolean,
  error: boolean
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: false
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks = [...state.tasks, action.payload] 
        state.loading = false
      })
      .addCase(createTask.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  },
})

export const { addTask } = taskSlice.actions

export const createTask = createAsyncThunk<Task, Task, { state: RootState }>(
  '/createTask',
  async (newTask, thunkApi) => {
    try {
      const res = await call<Task>('/createTask', newTask)

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

