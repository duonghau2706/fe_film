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

export { navbarScroll }
