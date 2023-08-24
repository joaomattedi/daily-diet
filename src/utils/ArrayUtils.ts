import { IMeal } from '../interfaces/IMealInterface'

export function calculateBiggerSequence(meals: Array<IMeal>) {
  let maxSequence = 0
  let currentSequence = 0

  meals.forEach((meal) => {
    if (meal.allowed_eat) {
      currentSequence++
      maxSequence = Math.max(maxSequence, currentSequence)
    } else {
      currentSequence = 0
    }
  })

  return maxSequence
}
