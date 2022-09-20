import { Transition } from '@headlessui/react'
import { useEscape } from '@hooks/useEscape'
import { useOnClickOutside } from '@hooks/useOnClickOutside'
import { ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'

interface Props {
    children: ReactNode
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export function Modal({ children, isOpen, setIsOpen }: Props) {
    function handleClose() {
        setIsOpen(false)
    }

    const modalRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(modalRef, handleClose)
    useEscape(handleClose)

    return createPortal(
        <>
            <Transition appear show={isOpen}>
                <Transition.Child
                    enter="duration-300"
                    enterFrom="backdrop-blur-none"
                    enterTo="bg-neutral-900/75 backdrop-blur-sm"
                    leave="duration-300"
                    leaveFrom="bg-neutral-900/75 backdrop-blur-sm"
                    leaveTo="backdrop-blur-none"
                    className="fixed inset-0"
                />

                <div className="fixed inset-0 flex min-h-screen items-center justify-center overflow-auto p-4">
                    <Transition.Child
                        ref={modalRef}
                        enter="duration-300"
                        enterFrom="opacity-0 scale-75"
                        enterTo="opacity-100 scale-500"
                        leave="duration-300"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-75"
                        className="defaultContainer"
                    >
                        <div className="space-y-4">{children}</div>
                    </Transition.Child>
                </div>
            </Transition>
        </>,
        document.body
    )
}
