export const setProfile = (details) => {
  console.log(details, "setting details")
  return {
    type: "SET_PROFILE",
    details
  }
}
