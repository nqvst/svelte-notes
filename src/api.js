const BASE_URL = 'http://localhost:1337/parse'
const HEADERS = {
    'X-Parse-Application-Id': 'editor-backend',
    'Content-type': 'application/json',
}

export const createNote = (data) => {
    return fetch(`${BASE_URL}/classes/Note`, {
        method: 'POST',
        headers: {
            ...HEADERS,
        },
        body: JSON.stringify(data),
    }).then((r) => r.json())
}

export const getNote = (id) => {
    return fetch(`${BASE_URL}/classes/Note/${id}`, {
        method: 'GET',
        headers: {
            ...HEADERS,
        },
    }).then((r) => r.json())
}

export const updateNote = (id, data) => {
    return fetch(`${BASE_URL}/classes/Note/${id}`, {
        method: 'PUT',
        headers: {
            ...HEADERS,
        },
        body: JSON.stringify(data),
    }).then((r) => r.json())
}

export const deleteNote = (id) => {
    return fetch(`${BASE_URL}/classes/Note/${id}`).then((r) => r.json())
}
