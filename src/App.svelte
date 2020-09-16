<script>
    import Parse from 'parse'
    import EditorJS from '@editorjs/editorjs'
    import Header from '@editorjs/header'
    import Checklist from '@editorjs/checklist'
    const Table = require('@editorjs/table')
    const CodeTool = require('@editorjs/code')
    const Marker = require('@editorjs/marker')

    export let save

    let editor
    let noteObject

    const hash = window.location.hash.replace('#', '')

    let promise = fetch(`http://localhost:1337/parse/classes/Note/${hash}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': 'editor-backend',
        },
    })

    promise
        .then((r) => r.json())
        .then((note) => {
            updateEditor(note)
        })

    const updateEditor = (note) => {
        noteObject = note
        console.log({ note })
        //editor.blocks = blocks
        editor = new EditorJS({
            holderId: 'editor',
            logLevel: 'VERBOSE',
            tools: {
                table: {
                    class: Table,
                },
                header: Header,
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                code: CodeTool,
                Marker: {
                    class: Marker,
                    shortcut: 'CMD+SHIFT+M',
                },
            },
            onReady: () => {
                console.log('Editor.js is ready to work!')
            },
            placeholder: 'Let`s write an awesome story!',
            data: note,
        })
    }

    const saveNote = () => {
        editor.save().then((res) => {
            console.log({ res, noteObject })
            const { blocks, time } = res
            save({ blocks, time }, noteObject).then((note) => {
                noteObject = note
            })
        })
    }
</script>

<style>
    main {
        margin: 10px;
        padding: 10px;
    }
</style>

<main>
    {#if noteObject}
        <p>note is savede with id {noteObject.objectId}</p>
    {:else}
        <p>unsaved note</p>
    {/if}
    <button on:click={saveNote}>save</button>
    <div id="editor" />
</main>
