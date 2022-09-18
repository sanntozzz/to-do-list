import { Modal } from './Modal'
import { TodosProps } from './TodoList'
interface Props {
    isValues: TodosProps
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

function TodoView({ isValues, isOpen, setIsOpen }: Props) {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="defaultGroup">
                <div className="groupTitle">Title</div>
                <div className="break-all">{isValues.text}</div>
            </div>
            <div className="flex gap-12">
                <div className="defaultGroup">
                    <div className="groupTitle">Date</div>
                    <div>
                        {new Date(isValues.date).toLocaleDateString('pt-PT')}
                    </div>
                </div>
                <div className="defaultGroup">
                    <div className="groupTitle">Hour</div>
                    <div>{isValues.hour}</div>
                </div>
            </div>
            <div className="defaultGroup">
                <div className="groupTitle">Description</div>
                <div className="break-all">{isValues.description}</div>
            </div>
            <button className="defaultButton" onClick={() => setIsOpen(false)}>
                Close
            </button>
        </Modal>
    )
}

export default TodoView
