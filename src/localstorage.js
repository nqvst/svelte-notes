const isAvailable = () =>
    typeof window !== 'undefined' &&
    window.localStorage &&
    window.localStorage.getItem

const get = (key) => {
    if (isAvailable()) {
        return window.localStorage.getItem(key)
    }
    console.error('localStorage is not available')
}

const set = (key, value) => {
    if (isAvailable()) {
        return window.localStorage.setItem(key, value)
    }
    console.error('localStorage is not available')
}

export default { set, get }
