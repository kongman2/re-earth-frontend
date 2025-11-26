// re-earth-frontend/src/pages/public/Landing/sections/LandingSectionLayout.jsx
import React from 'react'

/**
 * 랜딩 페이지 섹션 공통 레이아웃 컴포넌트
 * @param {string} sectionClass - section 태그에 적용할 클래스명
 * @param {string} containerClass - container에 적용할 추가 클래스명
 * @param {string} rowClass - row에 적용할 추가 클래스명
 * @param {string} titleSubtext - 제목 위 서브 텍스트
 * @param {string} titleText - 제목 텍스트
 * @param {string} titleClass - 제목 영역에 적용할 추가 클래스명
 * @param {string} contentClass - 컨텐츠 영역에 적용할 추가 클래스명
 * @param {React.ReactNode} children - 컨텐츠
 */
export default function LandingSectionLayout({
   sectionClass = '',
   containerClass = '',
   rowClass = '',
   titleSubtext,
   titleText,
   titleClass = '',
   contentClass = '',
   children
}) {
   return (
      <section className={`panel ${sectionClass}`}>
         <div className={`container ${containerClass}`}>
            <div className={`row ${rowClass}`}>
               <div className="col-12">
                  <div className={`landing-section__title ${titleClass}`}>
                     {titleSubtext && <p>{titleSubtext}</p>}
                     {titleText && <h2>{titleText}</h2>}
                  </div>
               </div>

               <div className={`col-12 ${contentClass}`}>
                  {children}
               </div>
            </div>
         </div>
      </section>
   )
}

