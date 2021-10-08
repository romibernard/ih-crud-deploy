// ./comopnents/Layout/Header.js

import React from 'react'
import IronhackLogo from "./../../assets/ironhack-logo.png"

import { Link } from "react-router-dom"

export default function Header() {
    return (
        <>
            <header class="bg-gray-800">
                <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                    <div class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                        <div class="flex items-center">
                            <Link to="/">
                                <img class="h-10 w-auto" src={IronhackLogo} alt="" />
                            </Link>
                            <div class="hidden ml-10 space-x-8 lg:block">
                                <Link to="/mike" class="text-base font-medium text-white hover:text-indigo-50" key="Solutions">
                                    CRUD c/Mike
                                </Link>

                                <a href="/crud-me" class="text-base font-medium text-white hover:text-indigo-50" key="Pricing">
                                    CRUD s/Mike
                                </a>

                                <Link to="/financial-app" class="text-base font-medium text-white hover:text-indigo-50" key="Docs">
                                    App Financiera
                                </Link>

                                <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Company">
                                    CRUD con MongoDB
                                </a>
                            </div>
                        </div>
                        <div class="ml-10 space-x-4">
                            <a href="#" class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">Iniciar sesión</a>
                            <a href="#" class="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">Registrarme</a>
                        </div>
                    </div>
                    <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
                        <Link to="/mike" class="text-base font-medium text-white hover:text-indigo-50" key="Solutions">
                            CRUD c/Mike
                        </Link>

                        <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Pricing">
                            CRUD s/Mike
                        </a>

                        <Link to="/financial-app" class="text-base font-medium text-white hover:text-indigo-50" key="Docs">
                            App Financiera
                        </Link>

                        <a href="#" class="text-base font-medium text-white hover:text-indigo-50" key="Company">
                            CRUD con MongoDB
                        </a>
                    </div>
                </nav>
            </header>

        </>
    )
}