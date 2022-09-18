import useDarkMode from 'hooks/useDarkMode'
import { Moon, Sun } from 'phosphor-react'
import { useEffect, useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'

export interface TodosProps {
    id: string
    text: string
    date: string
    hour: string
    description: string
    isCompleted: boolean
}

function TodoList() {
    const localStorageKey = 'TodoList'
    const [isOpen, setIsOpen] = useState(false)
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    const [todos, setTodos] = useState<TodosProps[]>([
        {
            id: '3156af5d-bc3a-44f7-9d75-cf92eb145cbc',
            text: 'asdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsaddasdasdsadsadasd',
            date: '2022-09-20',
            hour: '17:48',
            description:
                'asdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsaddasdasdsadsadasd',
            isCompleted: false,
        },
    ])

    useEffect(() => {
        const getTodos = localStorage.getItem(localStorageKey)

        if (getTodos) {
            setTodos(JSON.parse(getTodos))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(todos))
    }, [todos])

    const handleAdd = (todo: TodosProps) => {
        setTodos([...todos, todo])
    }

    const handleUpdate = (
        id: TodosProps['id'],
        text: TodosProps['text'],
        date: TodosProps['date'],
        description: TodosProps['description']
    ) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          text: text,
                          date: date,
                          description: description,
                      }
                    : todo
            )
        )
    }

    const handleComplete = (id: TodosProps['id']) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, isCompleted: !todo.isCompleted }
                    : todo
            )
        )
    }

    const handleDelete = (id: TodosProps['id']) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    return (
        <>
            <div className="defaultContainer space-y-4">
                <div className="flex items-center justify-between">
                    <div className="font-bold uppercase duration-150 dark:text-white">
                        To Do List
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className="text-xl text-neutral-500  duration-150"
                    >
                        {isDarkMode ? (
                            <Moon weight="bold" />
                        ) : (
                            <Sun weight="bold" />
                        )}
                    </button>
                </div>
                {todos.length !== 0 ? (
                    <Todo
                        todos={todos}
                        handleComplete={handleComplete}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                ) : (
                    <div className="text-sm text-neutral-500">
                        You have no todos
                    </div>
                )}
                <button
                    onClick={() => setIsOpen(true)}
                    className="defaultButton"
                >
                    Add Todo
                </button>
            </div>

            <TodoForm
                onSubmit={handleAdd}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}

export default TodoList
