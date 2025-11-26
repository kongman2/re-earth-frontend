// re-earth-frontend/src/App.jsx
import { useSelector } from 'react-redux'
import AppRouter from './routes/AppRouter'

export default function App() {
   const { hydrated, loading } = useSelector((s) => s.auth || {})

   // 하이드레이션 완료 전엔 가드들이 null을 그리므로 여기서 한번에 대기
   // main.jsx에서 이미 hydrateAuthThunk를 호출하므로 여기서는 중복 호출 제거
   if (!hydrated || loading) return null
   // 필요하면 스피너를 그려도 됨

   return <AppRouter />
}
