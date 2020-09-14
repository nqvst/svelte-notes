<script>
    import Parse from 'parse'
    import EditorJS from '@editorjs/editorjs'
    import Header from '@editorjs/header'
    import Checklist from '@editorjs/checklist'

    export let name
    export let save
    const editor = new EditorJS({
        holderId: 'editor',
        logLevel: 'VERBOSE',
        tools: {
            header: Header,
            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },
        },
        onReady: () => {
            console.log('Editor.js is ready to work!')
        },
        placeholder: 'Let`s write an awesome story!',
    })

    console.log(editor)
    const saveBlocks = () => {
        editor.save().then((res) => {
            console.log(res)
            save(res.blocks)
        })
    }
</script>

<style>
    p {
        color: purple;
    }
</style>

<p>{name}</p>
<button on:click={saveBlocks}>save</button>
<div id="editor" />
