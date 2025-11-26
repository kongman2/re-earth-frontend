// re-earth-frontend/src/components/common/AuthPageLayout.jsx
import './AuthPageLayout.scss'

function AuthPageLayout({ id, title, children, formClassName = '' }) {
   return (
      <section id="main1">
         <div id="area" className="container">
            <div id={id} className="auth-page">
               <div className="auth-page__content">
                  {title && <h2>{title}</h2>}
                  <div className={`auth-page__form ${formClassName}`}>
                     {children}
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default AuthPageLayout

