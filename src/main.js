import App from './App.svelte'
import { init, Note, NoteBlock } from './parse'
import Storage from './localstorage'
import { text } from 'svelte/internal'
import { tryParse } from './json'
import { createNote, updateNote } from './api'

const Parse = init()

const notebookId = window.location.hash || 'notehash1'

let myBlocks = []

const q = new Parse.Query(NoteBlock)
q.equalTo('notebookID', notebookId)

const saveObject = (object) => {
    return object.save().then(
        (o) => {
            console.log('New object created with objectId: ' + o.id)
            return o
        },
        (error) => {
            console.log(
                'Failed to create new object, with error code: ' + error.message
            )
        }
    )
}

const saveNote = (noteData, noteObject) => {
    if (noteObject && noteObject.objectId) {
        return updateNote(noteObject.objectId, noteData).then((res) => {
            console.log(res)
            return res
        })
    } else {
        return createNote(noteData).then((res) => {
            window.location.hash = `#${res.objectId}`
            return res
        })
    }
    // const note = new Note()
    // return note
    //     .save({
    //         ...noteData,
    //         notebookId,
    //     })
    //     .then(
    //         (note) => {
    //             console.log('New object created with objectId: ' + note.id)
    //             return note
    //         },
    //         (error) => {
    //             console.log(
    //                 'Failed to create new object, with error code: ' +
    //                     error.message
    //             )
    //         }
    //     )
}

const saveBlocks = (blocks) => {
    const promises = blocks.map((b) => {
        const block = new NoteBlock()
        block.set('timestamp', Date.now())
        block.set('type', b.type)
        block.set('data', b.data)
        block.set('notebookID', notebookId)
        return block.save().then(
            (b) => {
                // Execute any logic that should take place after the object is saved.
            },
            (error) => {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                console.log(
                    'Failed to create new object, with error code: ' +
                        error.message
                )
            }
        )
    })
    Promise.all(blocks).then()
}

const app = new App({
    target: document.body,
    props: {
        name: 'world',
        save: saveNote,
    },
})

window.app = app

export default app
