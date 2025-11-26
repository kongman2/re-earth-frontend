// re-earth-frontend/src/pages/user/Login/LoginForm.jsx
import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginUserThunk, hydrateAuthThunk } from '../../../features/authSlice'
//  임시 비활성화: 소셜 리다이렉트 함수 import 제거
// import { redirectToGoogleLogin, redirectToKakaoLogin } from '../../../api/authApi'

import InputField from '../../../components/common/InputField'
import Button from '../../../components/common/Button'
import Loading from '../../../components/common/Loading'
import Alert from '../../../components/common/Alert'
import googleIcon from '../../../assets/icons/google.svg'
import kakaoIcon from '../../../assets/icons/kakao.svg'

export default function LoginForm() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, isAuthenticated, user, error, hydrated } = useSelector((s) => s.auth)
   const [form, setForm] = useState({ idOrEmail: '', password: '' })
   const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null })

   const didRedirect = useRef(false)

   const showAlert = (message, variant = 'info', title = null) => {
      setAlert({ isOpen: true, message, variant, title })
   }

   const hideAlert = () => {
      setAlert({ isOpen: false, message: '', variant: 'info', title: null })
   }

   // 이미 로그인 상태로 /login 접근 시 역할별 자동 이동
   useEffect(() => {
      console.log('[LoginForm] auth state changed →', {
         isAuthenticated,
         user,
         loading,
         error,
         hydrated,
      })
      if (hydrated && isAuthenticated && user && !didRedirect.current) {
         didRedirect.current = true
         if (user.role === 'ADMIN') navigate('/admin', { replace: true })
         else navigate('/user', { replace: true })
      }
   }, [hydrated, isAuthenticated, user, loading, error, navigate])

   const onChange = (e) => {
      const { name, value } = e.target
      setForm((prev) => ({ ...prev, [name]: value }))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      if (loading) return

      //  이미 로그인 상태라면 /auth/login 다시 치지 않음
      if (hydrated && isAuthenticated) return

      const idOrEmail = form.idOrEmail.trim()
      const password = form.password
      if (!idOrEmail) {
         showAlert('아이디 또는 이메일을 입력하세요.', 'warning', '입력 오류')
         return
      }
      if (!password) {
         showAlert('비밀번호를 입력하세요.', 'warning', '입력 오류')
         return
      }

      // 백엔드 호환: idOrEmail, userId 둘 다 전달
      const payload = { idOrEmail, userId: idOrEmail, password }
      console.log('[LoginForm] submitting login payload:', payload)

      try {
         const loggedUser = await dispatch(loginUserThunk(payload)).unwrap()
         console.log('[LoginForm] loginUserThunk success →', loggedUser)

         // 세션 정보 최신화
         await dispatch(hydrateAuthThunk())

         // 역할별 리다이렉트
         if (!didRedirect.current) {
            didRedirect.current = true
            if (loggedUser?.role === 'ADMIN') {
               showAlert('관리자 로그인 성공! 환영합니다 :)', 'success', '로그인 성공')
               setTimeout(() => navigate('/admin', { replace: true }), 1500)
            } else {
               showAlert('로그인 성공! 환영합니다 :)', 'success', '로그인 성공')
               setTimeout(() => navigate('/user', { replace: true }), 1500)
            }
         }
      } catch (err) {
         console.error('[LoginForm] loginUserThunk error →', err)
         showAlert(typeof err === 'string' ? err : '로그인에 실패했습니다.', 'error', '로그인 실패')
      } finally {
         // 보안상 비밀번호 초기화
         setForm((prev) => ({ ...prev, password: '' }))
      }
   }

   //  소셜 로그인 임시 비활성화: /login 페이지 유지 + 알림만 표시
   const handleGoogle = () => {
      if (loading) return
      showAlert('구글 로그인은 기능 구현 예정입니다.', 'info', '알림')
      // redirectToGoogleLogin()  // ← 재활성화 시 복구
   }

   const handleKakao = () => {
      if (loading) return
      showAlert('카카오 로그인은 기능 구현 예정입니다.', 'info', '알림')
      // redirectToKakaoLogin()  // ← 재활성화 시 복구
   }

   return (
      <>
         {alert.isOpen && (
            <Alert
               variant={alert.variant}
               title={alert.title}
               isModal={true}
               dismissible={true}
               onClose={hideAlert}
               size="sm"
            >
               {alert.message}
            </Alert>
         )}
         <div className="user-login mt-40">
            <form onSubmit={handleSubmit}>
            <InputField label="아이디" type="text" name="idOrEmail" placeholder="아이디 또는 이메일을 입력하세요." value={form.idOrEmail} inputChange={onChange} disabled={loading} required autoComplete="username" />
            <InputField label="비밀번호" type="password" name="password" placeholder="비밀번호를 입력하세요." required value={form.password} inputChange={onChange} disabled={loading} marginTop="mt-20" autoComplete="current-password" />

            <Button variant="find" type="button" className="mt-10" onClick={() => window.location.href = '/finding'}>
               아이디 / 비밀번호 찾기
            </Button>

            <Button 
               variant="main1" 
               type="submit" 
               className="mt-40" 
               disabled={loading || didRedirect.current}
               fullWidth
            >
               {loading ? '로그인 중…' : '로그인'}
            </Button>
         </form>

         <div className="socialLogin mt-40">
            <Button 
               variant="google" 
               type="button" 
               onClick={handleGoogle} 
               disabled={loading}
               icon={<img src={googleIcon} alt="구글" />}
            >
               <span>구글 아이디로 로그인</span>
            </Button>

            <Button 
               variant="kakao" 
               type="button" 
               onClick={handleKakao} 
               disabled={loading}
               icon={<img src={kakaoIcon} alt="카카오" />}
            >
               <span>카카오 아이디로 로그인</span>
            </Button>
         </div>
      </div>
      </>
   )
}
