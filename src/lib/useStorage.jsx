export const useStorage = () => {

  const getStorage = () => JSON.parse(localStorage.getItem('todos'))
  const saveStorage = (arr) => {
    localStorage.setItem('todos', JSON.stringify(arr))
  }

  return [
    getStorage,
    saveStorage
  ]
}