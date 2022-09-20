import { useEffect, useRef, useState } from 'react'
import { v4 } from 'uuid'
import { Modal } from './Modal'
import { TodosProps } from './TodoList'

interface Props {
    isValues?: TodosProps
    onSubmit: ({}: TodosProps) => void
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export function TodoForm({ isValues, onSubmit, isOpen, setIsOpen }: Props) {
    const [input, setInput] = useState('')
    const [date, setDate] = useState('')
    const [hour, setHour] = useState('')
    const [description, setDescription] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setInput(isValues ? isValues.text : '')
        setDate(isValues ? isValues.date : '')
        setHour(isValues ? isValues.hour : '')
        setDescription(isValues ? isValues.description : '')
    }, [isValues])

    useEffect(() => {
        if (inputRef.current != null) {
            inputRef.current.focus()
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        setInput('')
        setDate('')
        setHour('')
        setDescription('')
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        onSubmit({
            id: v4(),
            text: input,
            date: date,
            hour: hour,
            description: description,
            isCompleted: false,
        })
        handleClose()
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="font-bold duration-150 dark:text-white">
                {isValues ? 'Update todo' : 'Add todo'}
            </div>
            <form onSubmit={handleSubmit} className="defaultGroup !space-y-4">
                <div className="defaultGroup">
                    <div className="groupTitle">Title</div>
                    <input
                        className="defaultInput"
                        type="text"
                        value={input}
                        placeholder="Title"
                        onChange={(e) => setInput(e.target.value)}
                        ref={inputRef}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="space-y-2">
                        <div className="groupTitle">Date</div>
                        <input
                            type="date"
                            className="defaultInput"
                            min={new Date().toISOString().split('T')[0]}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="groupTitle">Hour</div>
                        <input
                            type="time"
                            className="defaultInput"
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="defaultGroup">
                    <div className="groupTitle">Description</div>
                    <textarea
                        className="defaultInput"
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <button className="defaultButton">
                        {isValues ? 'Update' : 'Submit'}
                    </button>
                    <button
                        type="button"
                        className="defaultButton"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    )
}
