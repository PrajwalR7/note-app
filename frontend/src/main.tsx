import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/index.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.tsx'
import Signup from './components/Signup.tsx'
import { StateManager } from './utils/stateManager.ts'

window.addEventListener('beforeunload', () => {
    const currState = store.getState()
    new StateManager().saveState({user: currState.user})
})

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
