import { useReducer } from 'react'

type FeedingType = 'bottle' | 'breast'

type Feeding = {
  id: number
  babyId: number
  type: FeedingType
  amount?: number
  duration?: number
  time: string
}

type Action =
  | { type: 'ADD_FEEDING'; payload: Feeding }
  | { type: 'UPDATE_FEEDING'; payload: Feeding }
  | { type: 'DELETE_FEEDING'; payload: number }

function feedingReducer(state: Feeding[], action: Action): Feeding[] {
  switch (action.type) {
    case 'ADD_FEEDING':
      return [...state, action.payload]
    case 'UPDATE_FEEDING':
      return state.map(feeding => 
        feeding.id === action.payload.id ? action.payload : feeding
      )
    case 'DELETE_FEEDING':
      return state.filter(feeding => feeding.id !== action.payload)
    default:
      return state
  }
}

export function useFeedingData() {
  const [feedings, dispatch] = useReducer(feedingReducer, [])

  const addFeeding = (feeding: Feeding) => {
    dispatch({ type: 'ADD_FEEDING', payload: feeding })
  }

  const updateFeeding = (feeding: Feeding) => {
    dispatch({ type: 'UPDATE_FEEDING', payload: feeding })
  }

  const deleteFeeding = (id: number) => {
    dispatch({ type: 'DELETE_FEEDING', payload: id })
  }

  return { feedings, addFeeding, updateFeeding, deleteFeeding }
}

