import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Check, DotsThree, Eye, Pencil, Trash } from 'phosphor-react'
import { useState } from 'react'
import TodoForm from './TodoForm'
import { TodosProps } from './TodoList'
import TodoView from './TodoView'
interface Props {
    todos: TodosProps[]
    handleUpdate: (
        id: TodosProps['id'],
        text: TodosProps['text'],
        date: TodosProps['date'],
        hour: TodosProps['hour'],
        description: TodosProps['description']
    ) => void
    handleComplete: (id: TodosProps['id']) => void
    handleDelete: (id: TodosProps['id']) => void
}

function Todo({ todos, handleComplete, handleUpdate, handleDelete }: Props) {
    const [isValues, setIsValues] = useState<TodosProps>({
        id: '',
        text: '',
        date: '',
        hour: '',
        description: '',
        isCompleted: false,
    })

    const handleValues = (
        id: TodosProps['id'],
        text: TodosProps['text'],
        date: TodosProps['date'],
        hour: TodosProps['hour'],
        description: TodosProps['description'],
        isCompleted: TodosProps['isCompleted']
    ) => {
        setIsValues({
            id: id,
            text: text,
            date: date,
            hour: hour,
            description: description,
            isCompleted: isCompleted,
        })
    }

    const handleSubmit = ({
        text,
        date,
        hour,
        description,
    }: {
        text: TodosProps['text']
        date: TodosProps['date']
        hour: TodosProps['hour']
        description: TodosProps['description']
    }) => {
        handleUpdate(isValues.id, text, date, hour, description)
    }

    const [isFormOpen, setFormIsOpen] = useState(false)
    const [isViewOpen, setViewIsOpen] = useState(false)

    return (
        <>
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className="flex items-center justify-between space-x-4 text-sm"
                >
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => handleComplete(todo.id)}
                            className={clsx(
                                todo.isCompleted &&
                                    'bg-neutral-300 dark:bg-neutral-700',
                                'rounded-full p-0.5 text-white ring-2 ring-neutral-300 duration-150  dark:ring-neutral-700'
                            )}
                        >
                            <Check
                                weight="bold"
                                className={
                                    todo.isCompleted ? 'visible' : 'invisible'
                                }
                            />
                        </button>

                        <div
                            className={clsx(
                                todo.isCompleted &&
                                    'text-neutral-300 line-through dark:!text-neutral-600',
                                'break-all duration-150 line-clamp-1 dark:text-white'
                            )}
                        >
                            {todo.text}
                        </div>
                    </div>
                    <Menu as="div">
                        {({ open }) => (
                            <>
                                <Menu.Button className="flex items-center text-4xl text-neutral-300 dark:text-neutral-700">
                                    <DotsThree weight="bold" />
                                </Menu.Button>
                                <Transition
                                    show={open}
                                    enter="duration-150"
                                    enterFrom="scale-75 opacity-0"
                                    enterTo="scale-100 opacity-100"
                                    leave="duration-150"
                                    leaveFrom="scale-100 opacity-100"
                                    leaveTo="scale-75 opacity-0"
                                >
                                    <Menu.Items className="absolute right-0 min-w-full divide-y rounded-md bg-white ring-1 ring-black/10 drop-shadow-md duration-150 dark:bg-neutral-900">
                                        <Menu.Item
                                            as="button"
                                            className="menuItem"
                                            onClick={() => {
                                                handleValues(
                                                    todo.id,
                                                    todo.text,
                                                    todo.date,
                                                    todo.hour,
                                                    todo.description,
                                                    todo.isCompleted
                                                )
                                                setViewIsOpen(true)
                                            }}
                                        >
                                            <Eye weight="bold" />
                                            <div>View</div>
                                        </Menu.Item>
                                        {!todo.isCompleted && (
                                            <Menu.Item
                                                as="button"
                                                className="menuItem"
                                                onClick={() => {
                                                    handleValues(
                                                        todo.id,
                                                        todo.text,
                                                        todo.date,
                                                        todo.hour,
                                                        todo.description,
                                                        todo.isCompleted
                                                    )
                                                    setFormIsOpen(true)
                                                }}
                                            >
                                                <Pencil weight="bold" />
                                                <div>Edit</div>
                                            </Menu.Item>
                                        )}
                                        <Menu.Item
                                            as="button"
                                            className="menuItem"
                                            onClick={() =>
                                                handleDelete(todo.id)
                                            }
                                        >
                                            <Trash weight="bold" />
                                            <div>Delete</div>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                </div>
            ))}

            <TodoForm
                isValues={isValues}
                onSubmit={handleSubmit}
                isOpen={isFormOpen}
                setIsOpen={setFormIsOpen}
            />

            <TodoView
                isValues={isValues}
                isOpen={isViewOpen}
                setIsOpen={setViewIsOpen}
            />
        </>
    )
}

export default Todo
