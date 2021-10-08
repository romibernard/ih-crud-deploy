// ./components/FinancialApp/Sidebar.js

// useEffect
// Es un hook que me permite realizar efectos secundarios en el código ("side effects"). Los "side effects" usuales son peticiones de API.
// O necesitan re-renderizar la vista nuevamente, en caso de que haya habido algún cambio en una variable externa, como en useState.
import React, { useState, useEffect } from 'react'

import PacmanLoader from "react-spinners/PacmanLoader"; //aquí importo mi item de cargando...

import axios from "axios"

export default function Sidebar() {

    const [listCurrencies, setListCurrencies] = useState([])


    // SINTAXIS DE USEEFFECT
    // 1er. argumento - Es un callback - una función que se ejecuta a partir del monitorio del segundo argumento.

    // 2do. argumento - | <empty> | [] | [user]
    // El arreglo solo "[]" significa ejecútate una vez.

    useEffect(() => {

        const getResponse = async () => {
            // OBTENEMOS LA LLAMADA API - GET
            const res = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY_EXCHANGERATE}/latest/USD`)

            // EXTRAEMOS LA SECCIÓN DE CONVERSIONRATES
            const conversionRates = res.data.conversion_rates

            // CONVERTIMOS A ARREGLO TODOS LOS CONVERSION RATES, QUITANDO LOS VALUES
            const arrConversionRates = Object.keys(conversionRates)

            setListCurrencies(arrConversionRates)

        }

        getResponse()

    }, []) // SE EJECUTA UNA VEZ DESPUÉS DEL RENDER.     



    return (
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white">

            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div class="flex-shrink-0 flex items-center px-4">
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow" />
                </div>
                <nav class="mt-5 px-2 space-y-1">

                    {

                        listCurrencies.length === 0 ?
                            <>
                                <div className="flex h-48 justify-center items-center h-max">
                                    <PacmanLoader />
                                </div>
                            </>
                            :
                            listCurrencies.map(e => {
                                return (
                                    <>
                                        <a href="#" class="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                                            <svg class="text-gray-500 mr-4 flex-shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            {e}
                                        </a>

                                    </>
                                )
                            })


                    }




                </nav>
            </div>

        </div>
    )
}