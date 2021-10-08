// ./components/Home.js
import React from 'react'

import {
    Link
} from 'react-router-dom'

export default function Home() {
    return (
        <>
            <div class="bg-indigo-50">
                <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                        <span class="block">Ejercicios con Mike</span>
                        <span class="block text-indigo-600">Ironhack</span>
                    </h2>
                    <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div class="inline-flex rounded-md shadow">
                            <Link to="/mike" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                Empieza viendo el CRUD c/Mike
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}