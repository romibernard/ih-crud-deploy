//mi ejemplo
import React, { useState } from 'react'
import { nanoid } from "nanoid"

export default function CRUD() {
    //estados locales
    const [post, setPost] = useState({
        nombre: "",
        descripcion: ""
    })

    const [todos, setTodos] = useState([])

    const [id, setId] = useState("")

    const [editionMode, setEditionMode] = useState(false)


    //funciones -cambios en form
    const handleInputs = (event) => {
        //console.log("event.target.name:", event.target.name)
        //console.log("event.target.value:", event.target.value)
        setPost({
            ...post,
            id: nanoid(),
            [event.target.name]: event.target.value
        })
    }

    const editPost = (event) => {
        event.preventDefault()
        const arrayMod = todos.map((element) => {

            return element.id === id ?
                {
                    id: id,
                    titulo: post.nombre,
                    contenido: post.descripcion
                }
                : element
        })
        setTodos(arrayMod)

        setEditionMode(false)

        setPost({
            nombre: "",
            descripcion: ""
        })

    }

    const savePost = (event) => {
        event.preventDefault()
        setTodos([
            post,
            ...todos
        ])

    }

    const toggleEditionMode = (event, selectedPost) => {
        event.preventDefault()
        setEditionMode(true)
        setPost({
            id: selectedPost.id,
            nombre: selectedPost.nombre,
            descripcion: selectedPost.descripcion
        })
        setId(selectedPost.id)
    }

    const deletePost = (event, id) => {
        event.preventDefault()
        const newPosts = todos.filter(e => {
            return e.id !== id
        })
        setTodos(newPosts)
    }



    return (
        <>
            <div className="max-w-7xl mx-auto px-12 pt-12">
                <form onSubmit={editionMode ?
                    (event) => { editPost(event) }
                    :
                    (event) => { savePost(event) }}

                    className={editionMode ?
                        "p-10 bg-blue-100"
                        :
                        null
                    }
                >
                    <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
                    <div class="mt-1">
                        <input
                            type="text"
                            name="nombre"
                            class="shadow-sm focus:ring-blue-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mb-6"
                            placeholder="Nombra tu publicación..."
                            onChange={(event) => { handleInputs(event) }}
                            value={post.nombre}
                        />
                    </div>

                    <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
                    <div class="mt-1">
                        <input
                            type="text"
                            name="descripcion"
                            class="shadow-sm focus:ring-blue-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mb-6" placeholder="Ingresa info..."
                            onChange={(event) => { handleInputs(event) }}
                            value={post.descripcion}
                        />
                    </div>

                    <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                        {
                            editionMode ?
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                    Edita tu publicación
                                </>
                                :
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                                    </svg>
                                    ¡Crear!
                                </>


                        }


                    </button>
                </form>

                <h1 class="text-4xl font-extrabold text-gray-900 mt-12 sm:text-5xl sm:tracking-tight lg:text-6xl">Publicaciones</h1>
                <ul role="list" class="divide-y divide-gray-200 mt-12">

                    {
                        todos.length === 0 ?
                            <p>Publicaciones vacías</p>
                            :
                            todos.map(e => {
                                return (
                                    <>
                                        <li class="bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <div class="flex justify-between space-x-3">
                                                <div class="min-w-0 flex-1 block focus:outline-none">
                                                    <span class="inset-0" aria-hidden="true"></span>
                                                    <p class="text-sm font-medium text-gray-900 truncate">{e.nombre}</p>
                                                </div>
                                            </div>
                                            <div class="mt-1">
                                                <p class="line-clamp-2 text-sm text-gray-600">
                                                    {e.descripcion}
                                                </p>
                                            </div>

                                            <button className="mr-4 mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-00"
                                                onClick={(event) => { toggleEditionMode(event, e) }}>
                                                Edit
                                            </button>

                                            <button
                                                className="mr-4 mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-00"
                                                onClick={(event) => { deletePost(event, e.id) }}>
                                                Delete
                                            </button>
                                        </li>
                                    </>
                                )
                            })


                    }


                </ul>
            </div>
        </>
    )
}

