import App from './App.svelte'
import { init, NoteBlock } from './parse'
import Storage from './localstorage'
import { text } from 'svelte/internal'
import { tryParse } from './json'

const Parse = init()

const notebookId = window.location.hash || 'notehash1'

const q = new Parse.Query(NoteBlock)
q.equalTo('notebookID', notebookId)
q.find().then((res) => {
    console.log(res)
    const objects = res.map((b) => {
        return {
            type: b.get('type'),
            text: tryParse(b.get('data')),
            timestamp: b.get('timestamp'),
        }
    })
    console.log(objects)
})

const saveBlocks = (blocks) => {
    const promises = blocks.map((b) => {
        const block = new NoteBlock()
        block.set('timestamp', Date.now())
        block.set('type', b.type)
        block.set('data', JSON.stringify(b.data))
        block.set('notebookID', notebookId)
        return block.save().then(
            (b) => {
                // Execute any logic that should take place after the object is saved.
                console.log('New object created with objectId: ' + b.id)
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
        save: saveBlocks,
    },
})

window.app = app

export default app
