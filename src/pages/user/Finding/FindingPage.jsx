// re-earth-frontend/src/pages/user/Finding/FindingPage.jsx
import FindIdForm from '../../../components/finding/FindIdForm'
import FindIdSuccessForm from '../../../components/finding/FindIdSuccessForm'
import FindIdFailForm from '../../../components/finding/FindIdFailForm'
import FindPasswordForm from '../../../components/finding/FindPasswordForm'
import ReissuePasswordForm from '../../../components/finding/ReissuePasswordForm'

function IdfindPage() {
   return (
      <section id="main1" className="user-page bg-sub-m">
         <div id="area" className="container">
            <div id="finding" className="auth-page">
               <FindIdForm />
               <FindIdSuccessForm />
               <FindIdFailForm />
               <FindPasswordForm />
               <ReissuePasswordForm />
            </div>
         </div>
      </section>
   )
}
export default IdfindPage
