import React from 'react'


export const Header = () => {
  return (
    <div className="p-2 flex justify-between items-center dark:bg-neutral-900 border-b-2 border-gray-300">
        <img src="/logo-light.svg" alt="App Icon" className="w-50 h-14 "/>
        <form className="flex gap-2 items-center border-2 border-gray-400 dark:border-white rounded-md w-70 mr-6">  
            <label htmlFor="search"><img src="/search.svg" className="pl-1"/></label>
            <input type="text" placeholder='Search' id="search" className="p-1 h-6 w-full border-none outline-0 dark:text-neutral-300"/>
        </form>
        <div className="flex gap-3 dark:text-neutral-300 mr-4">
            <button className="p-2 w-8 h-8 flex items-center border rounded cursor-pointer transition duration-300 hover:scale-110 hover:shadow-lg dark:hover:shadow-neutral-300 dark:bg-neutral-950"><img src="/theme.svg" alt="Theme Icon"/></button>
        </div>
    </div>
  )
}
