// re-earth-frontend/src/main.jsx
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from './app/store.js'
import { hydrateAuthThunk } from './features/authSlice'

import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/commons.scss'

// 하이드레이션이 끝난 뒤에 렌더 시작
const container = document.getElementById('root')
const root = createRoot(container)

;(async () => {
   try {
      await store.dispatch(hydrateAuthThunk()).unwrap()
   } catch (e) {
      // 하이드레이션 실패해도 앱은 그린다 (게스트로 동작)
      console.warn('[bootstrap] hydrateAuthThunk failed:', e)
   }

   root.render(
      // <StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Provider>
      // </StrictMode>
   )
})()
