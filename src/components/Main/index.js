// ./components/Main/index.js
/*Manera larga
// 2. FUNCIONES
// MONITOREAR LOS CAMBIOS QUE SUCEDAN EN EL FORMULARIO
const handleTitle = (event) => {
    console.log(event.target.value)
 
    // FUNCIÓN QUE ALTERA EL ESTADO LOCAL "POST"
    // VA A REEMPLAZAR COMPLETAMENTE EL ESTADO LOCAL
    setPost({
        titulo: event.target.value,
        contenido: post.contenido
    })
 
}
*/
import React, { useState } from 'react'
import { nanoid } from "nanoid"

export default function Main() {

    // 1. ESTADOS LOCALES

    // La publicación que está en el formulario
    const [post, setPost] = useState({
        titulo: "",
        contenido: ""
    })

    // Un listado de todas las publicaciones que se han generado desde el formulario ( Un arreglo)
    const [list, setList] = useState([])

    // Crear un ID a través de un estado local nuevo
    const [id, setId] = useState("")


    // 2. FUNCIONES
    // MONITOREAR LOS CAMBIOS QUE SUCEDAN EN EL FORMULARIO
    const handleInputs = (event) => {

        console.log("event.target.name:", event.target.name)
        console.log("event.target.value:", event.target.value)

        // FUNCIÓN QUE ALTERA EL ESTADO LOCAL "POST"
        // VA A REEMPLAZAR COMPLETAMENTE EL ESTADO LOCAL
        setPost({
            ...post,
            id: nanoid(),
            [event.target.name]: event.target.value
        })
    }

    const savePost = (event) => {
        event.preventDefault()

        setList([
            post,
            ...list
        ])

    }


    const deletePost = (event, id) => {
        // 1. EVITA LA RECARGA DE PÁGINA
        event.preventDefault()

        // 2. VOY A UTILIZAR .FILTER PARA FILTRAR EL LISTADO DE PUBLICACIONES Y ENCONTRAR AL QUE QUIERO BORRAR
        // AQUÍ ESTAMOS CREANDO UN ARREGLO NUEVO

        console.log("Este es el id que estás eligiendo:", id)

        const arrayFiltrado = list.filter(element => {
            return element.id !== id

        })

        console.log("Este es el arreglo ya sin la publicación que elegiste")

        // 3. VOY A ACTUALIZAR EL LISTADO
        setList(arrayFiltrado)

    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-12 pt-12">

                <form>

                    <label for="titulo" class="block text-sm font-medium text-gray-700">Título</label>
                    <div class="mt-1">
                        <input
                            type="text"
                            name="titulo"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mb-6"
                            placeholder="Escribe el título principal de la publicación..."
                            onChange={(event) => { handleInputs(event) }}
                        />
                    </div>

                    <label for="contenido" class="block text-sm font-medium text-gray-700">Contenido</label>
                    <div class="mt-1">
                        <input
                            type="text"
                            name="contenido"
                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mb-6" placeholder="Escribe tu contenido..."
                            onChange={(event) => { handleInputs(event) }}
                        />
                    </div>

                    <button
                        type="button"
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(event) => { savePost(event) }}

                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                        </svg>
                        Crear publicación
                    </button>
                </form>


                <h1 class="text-4xl font-extrabold text-gray-900 mt-12 sm:text-5xl sm:tracking-tight lg:text-6xl">Publicaciones</h1>

                <ul role="list" class="divide-y divide-gray-200 mt-12">

                    {

                        // CONDICIONALES
                        // if(list.length === 0){
                        //    return " Aún no tienes    publiaciones"                           
                        // } else {
                        //    return <li>...</li>
                        //}

                        list.length === 0 ?
                            <p>Aún no tienes publicaciones.</p>
                            :
                            list.map(e => {
                                return (
                                    <>
                                        <li class="bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <div class="flex justify-between space-x-3">
                                                <div class="min-w-0 flex-1 block focus:outline-none">
                                                    <span class="inset-0" aria-hidden="true"></span>
                                                    <p class="text-sm font-medium text-gray-900 truncate">{e.titulo}</p>
                                                </div>
                                            </div>
                                            <div class="mt-1">
                                                <p class="line-clamp-2 text-sm text-gray-600">
                                                    {e.contenido}
                                                </p>
                                            </div>

                                            <button
                                                className="mr-4 mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-00"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="mr-4 mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-00"
                                                onClick={(event) => { deletePost(event, e.id) }}
                                            >
                                                Borrar
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