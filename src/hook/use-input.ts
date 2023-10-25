import { useReducer } from 'react'

const useInput = (props: any) => {
  // const [enteredInput, setEnteredInput] = useState('');
  // const [inputIsTouched, setInputIsTouched] = useState(false);

  const initialState = {
    enteredInput: '',
    inputIsTouched: false,
  }

  const inputReducer = (state = initialState, action: any) => {
    if (action.type === 'input') {
      return {
        enteredInput: action.value,
        inputIsTouched: state.inputIsTouched,
      }
    }
    if (action.type === 'touched') {
      return {
        enteredInput: state.enteredInput,
        inputIsTouched: true,
      }
    }
    if (action.type === 'input') {
      return {
        enteredInput: '',
        inputIsTouched: false,
      }
    }
    return state
  }

  const [state, dispatch] = useReducer(inputReducer, initialState)

  const inputEnteredNotValid = props(state.enteredInput)
  const inputIsNotValid = inputEnteredNotValid && state.inputIsTouched

  const inputChangeHandler = (event: any) => {
    dispatch({ type: 'input', value: event.target.value })
    //setEnteredInput(event.target.value);
  }

  const inputBlurHandler = () => {
    dispatch({ type: 'touched' })
    // setInputIsTouched(true);
  }

  const inputReset = () => {
    dispatch({ type: 'reset' })
    // setEnteredInput('');
    // setInputIsTouched(false);
  }

  return {
    value: state.enteredInput,
    inputIsNotValid,
    inputChangeHandler,
    inputBlurHandler,
    inputReset,
  }
}

export default useInput
