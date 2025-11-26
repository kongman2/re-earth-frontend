// src/api/http.js
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

const reEarth = axios.create({
   baseURL: BASE_URL,
   headers: { 'Content-Type': 'application/json' },
   withCredentials: true,
   // 기본값 validateStatus는 200~299만 성공 처리, 4xx/5xx는 throw
   // → 여기서는 굳이 override 안 합니다.
})

// ───────── 요청 인터셉터
reEarth.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token')
      const url = (config.url || '').toString()

      // 로그인/회원가입 계열은 토큰 헤더 붙이지 않음
      const skipAuthHeader = /\/auth\/(login|login-admin|join)\b/i.test(url)

      if (token && !skipAuthHeader) {
         // 서버가 Bearer 접두사 없이도 처리 가능하다면 그대로 전달
         config.headers.Authorization = `${token}`
         // 만약 Bearer 접두사가 필요하다면 아래처럼 변경
         // config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (error) => Promise.reject(error)
)

// ───────── 응답 인터셉터
reEarth.interceptors.response.use(
   (response) => {
      // 2xx 범위를 벗어나면 에러로 던지기
      if (response.status < 200 || response.status >= 300) {
         return Promise.reject(response)
      }
      return response
   },
   (error) => {
      const status = error?.response?.status
      const url = error?.config?.url || ''
      
      // /auth/me의 401은 정상적인 동작(로그인하지 않은 상태)이므로 조용히 처리
      if (url.includes('/auth/me') && status === 401) {
         // 401 응답을 그대로 반환하여 하이드레이션 로직에서 처리
         return Promise.resolve(error.response)
      }
      
      // 419 (토큰 만료), 401, 403 같은 인증 오류는 개발 환경에서 조용히 처리
      // 브라우저 콘솔에 에러가 표시되지 않도록 suppress
      if (status === 419 || status === 401 || status === 403) {
         // 에러를 조용히 reject하되, 콘솔에는 표시하지 않음
         // 각 API 함수에서 catch하여 목업 데이터로 대체할 수 있도록 함
         return Promise.reject(error)
      }
      
      return Promise.reject(error)
   }
)

export default reEarth
