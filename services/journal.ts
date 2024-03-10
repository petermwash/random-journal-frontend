export const createJournal = async (email: string, content: string) => {
    const response = await fetch(
      "https://random-journal-backend.onrender.com/journals/add",
      {
          method: "post",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              email: email,
              content: content
          })
      }
    )
  
    if (response.status !== 200) {
      console.log("ADD_JOURNAL_ERROR => ", response.statusText)
    }
  
    const journal = await response.json()
    return journal;
  }