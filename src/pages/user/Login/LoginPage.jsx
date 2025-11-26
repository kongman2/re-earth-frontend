// re-earth-frontend/src/pages/user/Login/LoginPage.jsx
import LoginForm from './LoginForm'
import AuthPageLayout from '../../../components/auth/AuthPageLayout'

function LoginPage() {
   return (
      <AuthPageLayout id="login" title="로그인하기">
         <LoginForm />
      </AuthPageLayout>
   )
}

export default LoginPage
