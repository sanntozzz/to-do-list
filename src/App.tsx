import { Footer, TodoList } from 'components'

function App() {
    return (
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-6 p-4">
            <TodoList />
            <Footer />
        </div>
    )
}

export default App
