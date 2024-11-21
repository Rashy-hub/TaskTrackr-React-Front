import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

import AddTodoPage from './pages/AddTodoPage'
import TodoDetailPage from './pages/TodoDetailPage'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={<ProtectedRoute element={<App />} />}
                    />
                    <Route
                        path="/todos"
                        element={<ProtectedRoute element={<App />} />}
                    />
                    <Route
                        path="/todos/:todoId"
                        element={
                            <ProtectedRoute element={<TodoDetailPage />} />
                        }
                    />
                    <Route
                        path="/todos/add"
                        element={<ProtectedRoute element={<AddTodoPage />} />}
                    />

                    {/* Error Routes */}
                    <Route path="/error/:message" element={<ErrorPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </QueryClientProvider>
)
