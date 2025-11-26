// re-earth-frontend/src/routes/guards/UserOnly.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MenuBar from '../../components/menu/MenuBar'

export default function UserOnly() {
   const { isAuthenticated, loading, hydrated } = useSelector((s) => s.auth || {})
   const location = useLocation()

   // 아직 초기 세션 확인 중이면 아무것도 하지 않음
   if (!hydrated || loading) return null

   if (!isAuthenticated) {
      return <Navigate to="/login" replace state={{ from: location }} />
   }
   
   return (
      <>
         <MenuBar />
         <div className="user-page-wrapper">
            <Outlet />
         </div>
      </>
   )
}
