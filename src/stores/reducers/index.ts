const navbarScroll = (state = { isScrolled: false }, action: string) => {
  if (action === 'SCROLL') {
    return {
      isScrolled: true,
    }
  }

  if (action === 'UNSCROLL') {
    return {
      isScrolled: false,
    }
  }

  return state
}

//Setting
const initialSetting = {
  enteredName: 'Autumn',
  enteredNickName: '',
  isValid: false,
  isTouched: false,
  isShowLimit: false,
  isTooShort: false,
  isTooLong: false,
  currentLenght: 0,
}
const settings = (state = initialSetting, action: any) => {
  if (action.type === 'NAME_CHANGE') {
    return {
      ...state,
      enteredName: action.payload,
    }
  } else if (action.type === 'NICKNAME_CHANGE') {
    return {
      ...state,
      enteredNickName: action.payload,
      isTooShort: action.payload.length < 3,
      isValid: action.payload.length > 2 && action.payload.length < 17,
      isTooLong: action.payload.length > 16,
      currentLenght: action.payload.length,
    }
  } else if (action.type === 'NICKNAME_BLUR') {
    return { ...state, isTouched: true }
  } else if (action.type === 'NICKNAME_CLICK') {
    return { ...state, isShowLimit: true }
  } else return state
}

export { navbarScroll, settings }
