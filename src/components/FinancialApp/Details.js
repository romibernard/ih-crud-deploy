import React, { useState, useEffect } from 'react'

import axios from "axios"

import { Line } from 'react-chartjs-2'

import {
    useParams
} from "react-router-dom"

export default function Details() {

    // OBTENER PARÁMETRO DE URL
    const getCurrency = useParams()
    console.log(getCurrency)

    const { currency } = getCurrency
    const newCurrency = currency.toUpperCase()

    // GENERAMOS UN ESTADO LOCAL PARA LAS FECHAS
    const [date, setDate] = useState({
        startDate: "2021-01-08",
        endDate: "2021-03-04"
    })

    const [loading, setLoading] = useState(true)



    const [dataChart, setDataChart] = useState({})


    useEffect(() => {

        const getResponse = async () => {

            setLoading(true)

            const res = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${date.startDate}&end_date=${date.endDate}&base=USD&symbols=${newCurrency}`)


            console.log(res)

            const rates = res.data.rates
            console.log(rates)

            // labels en Chart.js nos funcionan para establecer el axis x
            const labels = Object.keys(rates)

            console.log(labels)

            // [
            //               "19.88",
            //               "19.85",
            //              "20.01"
            //           ]
            const dataValues = labels.map(e => {

                // rates.2021-01-01.MXN // DOT NOTATION
                // rates["2021-01-01"]["MXN"] // BRACKET NOTATION

                return rates[e][newCurrency]

            })

            console.log(dataValues)

            // CREAR GRÁFICA

            setDataChart({
                labels: labels,
                datasets: [{
                    label: `¿Cuánto vale un dólar en ${newCurrency}?`,
                    data: dataValues, // Un arreglo de valores monetarios
                    borderColor: "#000",
                    pointBackgroundColor: "#f42534",
                    pointRadius: 4
                }]
            })

            // APAGAR LOADING
            setLoading(false)

            /**
             * {
             *  labels: ["2021-01-01","2021-01-02", "2021-01-03"...],
             *  datasets: [
             *  {
             *      label: `Cuánto vale un dólar en la moneda ${currency}`
             *      data: [
             *          "19.88",
             *          "19.85",
             *          "20.01"
             *      ],
             *      borderColor: "#00000",
             *      pointBackgroundColor: "#f425334"
             *  }
             * ]
             * }
             */



        }

        getResponse()

    }, [date, newCurrency])


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

            {
                loading ?

                    <p>Cargando...</p>
                    :
                    <Line data={dataChart} />
            }



        </div>
    )
}