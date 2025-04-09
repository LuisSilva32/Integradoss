import AdminLayout from '@/components/layout/AdminLayout'
import ConvocatoriasAdmin from '@/pages/admin/ConvocatoriasAdmin'
import InvestigadoresAdmin from '@/pages/admin/InvestigadoresAdmin'
import ProyectosAdmin from '@/pages/admin/ProyectosAdmin'
import PublicacionesAdmin from '@/pages/admin/PublicacionesAdmin'
import SignIn from '@/pages/admin/SignIn'
import ConvocatoriasPublic from '@/pages/public/ConvocatoriasPublic'
import Home from '@/pages/public/Home'
import InvestigadoresPublic from '@/pages/public/InvestigadoresPublic'
import ProyectosPublic from '@/pages/public/ProyectosPublic'
import PublicacionesPublic from '@/pages/public/PublicacionesPublic'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

function App () {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/investigadores' element={<InvestigadoresPublic />} />
        <Route path='/convocatorias' element={<ConvocatoriasPublic />} />
        <Route path='/proyectos' element={<ProyectosPublic />} />
        <Route path='/publicaciones' element={<PublicacionesPublic />} />

        {/* Admin Routes */}
        <Route path='/iniciar-sesion' element={<SignIn />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<ConvocatoriasAdmin />} />
          <Route path='convocatorias' element={<ConvocatoriasAdmin />} />
          <Route path='proyectos' element={<ProyectosAdmin />} />
          <Route path='publicaciones' element={<PublicacionesAdmin />} />
          <Route path='investigadores' element={<InvestigadoresAdmin />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
