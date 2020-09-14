const tryParse = (string) => {
    try {
        return JSON.parse(string)
    } catch (e) {
        // console.log(e)
    }
    return null
}

export default { tryParse }
