import React, { useState, useEffect } from 'react'

import axios from "axios"

import {
    useParams
} from "react-router-dom"

export default function Details() {

    const getCurrency = useParams()

    const { currency } = getCurrency

    const [date, setDate] = useState({
        startDate: "2021-01-08",
        endDate: "2021-03-04"
    })

    useEffect(() => {

        const getResponse = async () => {

            const res = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${date.startDate}&end_date=${date.endDate}&base=USD&symbols=${currency}`)


            console.log(res)

        }

        getResponse()

    }, [date, currency])


    // FUNCIONES
    const handleDate = (event) => {
        event.preventDefault()

        setDate({
            ...date,
            [event.target.name]: event.target.value
        })

    }



    return (
        <div>
            <label>Escribe la fecha de inicio de búsqueda</label>
            <input
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mb-6"
                type="date"
                value={date.startDate}
                name="startDate"
                onChange={(e) => { handleDate(e) }}
            />

            <label>Escribe la fecha de finalización de búsqueda</label>
            <input
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mb-6"
                type="date"
                value={date.endDate}
                name="endDate"
                onChange={(e) => { handleDate(e) }}
            />
        </div>
    )
}