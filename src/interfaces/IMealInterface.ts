export interface IMeal {
  id: string
  name: string
  description?: string
  meal_date: Date
  meal_time: string
  allowed_eat: boolean
  user_uuid: string
}
