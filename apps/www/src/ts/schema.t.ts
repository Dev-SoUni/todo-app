export interface Todo {
  id: string
  user_id: string
  title: string
  description: string | null
  date: Date
  is_done: 0 | 1
  created_at: Date
}
