import { createContext, useReducer, ChangeEvent, ReactElement, useCallback} from 'react'

type StateType = {
  count: number
  text: string
}

const initState: StateType = { count: 0, text: '' }

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE
  payload?: string
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 }
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 }
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? '' } // se action.payload è null/undefined restituisci ""
    // senza il nullish coaleshing operator darebbe errore perchè text potrebbe anche essere undefined ma nell'initState è stato settato come string
    default:
      throw new Error()
  }
}

const useCounterContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const increment = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT }), [])

  const decrement = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT }), [])

  const changeText = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: REDUCER_ACTION_TYPE.NEW_INPUT,
      payload: e.target.value,
    }), [])

  return { state, increment, decrement, changeText }
}

// grazie all'utility type ReturnType copiamo il return type di useCounterContext
type UseCounterContextType = ReturnType<typeof useCounterContext>

const initStateContext: UseCounterContextType = {
  // these are values, not types
  state: initState,
  increment: () => {},
  decrement: () => {},
  changeText: (e: ChangeEvent<HTMLInputElement>) => {}
}

export const CounterContext = createContext<UseCounterContextType>(initStateContext)

type ChildrenType = {
  children?: ReactElement | undefined
}

export const CounterProvider = ({
  children, ...initState
}: ChildrenType & StateType): ReactElement => {
  return (
    // con useCounterContext passo lo state e tutti i metodi
    <CounterContext.Provider value={useCounterContext(initState)}>
      {children}
    </CounterContext.Provider>
  )
}