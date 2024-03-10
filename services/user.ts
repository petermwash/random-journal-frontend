export const addUser = async (email: string, fUserId: string) => {
  const response = await fetch(
    "https://random-journal-backend.onrender.com/users/add",
    {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            fUserId: fUserId
        })
    }
  )

  if (response.status !== 200) {
    console.log("ADD_USER_ERROR => ", response.statusText)
  }

  const addedUser = await response.json()
  return addedUser;
}