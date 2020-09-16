//import '../node_modules/parse/dist/parse.min'
import Parse from 'parse'

export const init = () => {
    Parse.initialize('editor-backend', 'passw0rd')
    Parse.serverURL = 'http://localhost:1337/parse'
    return Parse
}

export const NoteBlock = Parse.Object.extend('NoteBlock')
export const Note = Parse.Object.extend('Note')
