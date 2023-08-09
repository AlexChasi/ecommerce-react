import { Navbar } from './components/layout/navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Cart } from './components/modals/cart/cart'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Footer } from './components/layout/footer'
import { ProtectedRoute } from './components/layout/protected-route'
import { Purchases } from './pages/purchases'
import { Filters } from './components/modals/filters/filters'
import { ProductPage } from './pages/product-page'

function App () {
  return (
    <div className="flex flex-col-reverse flex-1 [&>main]:flex-1 [&>main]:min-h-screen">

      <Router>

        <Footer />

        <Routes>

          <Route element={<Home />} path='/' exact />
          <Route element={<Login />} path='/login' exact />
          <Route element={<Register />} path='/register' exact />
          <Route element={<ProductPage />} path='/products/:id' exact />

          <Route
            path='/purchases'
            element={
              <ProtectedRoute>
                <Purchases />
              </ProtectedRoute>
          }>

          </Route>

        </Routes>

        <Filters />

        <Navbar />

        <Cart />

      </Router>

    </div>
  )
}

export default App
