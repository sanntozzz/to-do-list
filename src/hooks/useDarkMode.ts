import { useEffect, useState } from 'react'

interface useDarkModeOutput {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

export function useDarkMode(): useDarkModeOutput {
    const [isDarkMode, setDarkMode] = useState(false)

    const getlocalStorageTheme = localStorage.getItem('isDarkMode')

    const setlocalStorageTheme = (data: any) =>
        localStorage.setItem('isDarkMode', data)

    useEffect(() => {
        getlocalStorageTheme
    }, [])

    useEffect(() => {
        setlocalStorageTheme(isDarkMode)
    }, [isDarkMode])

    if (!isDarkMode) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    return {
        isDarkMode,
        toggleDarkMode: () => setDarkMode((isDarkMode) => !isDarkMode),
    }
}
