// re-earth-frontend/src/pages/user/main/sections/HeroSection.jsx
import HeroBanner from '../../../../components/main/HeroBanner'
import QuickActions from '../../../../components/main/QuickActions'

export default function HeroSection() {
   return (
      <section id="hero" className="main-hero section">
         <div className="container">
            <div className="row">
               <HeroBanner />
               <QuickActions />
            </div>
         </div>
      </section>
   )
}
