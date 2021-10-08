// ./components/FinancialApp/index.js
import React from 'react'
import Sidebar from './Sidebar'


export default function FinancialApp(props) {
    return (
        <div className="flex">

            <Sidebar />
            {/*Contenido de las rutas: SECCIÓN DINÁMICA */}
            {props.children}
        </div>
    )
}