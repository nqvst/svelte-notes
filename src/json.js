const tryParse = (string) => {
    try {
        return JSON.parse(string)
    } catch (e) {
        // console.log(e)
    }
    return undefined
}

export default { tryParse }
