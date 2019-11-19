/*
export function someMutation (state) {
}
*/
export function toolbarButtonStatus (state, status) {
  if (status) {
    state.toolbarButton = status
  } else {
    state.toolbarButton = !state.toolbarButton
  }
}

export function leftDrawerOpenStatus (state, status) {
  if (status) {
    state.leftDrawerOpen = status
  } else {
    state.leftDrawerOpen = !state.leftDrawerOpen
  }
}
