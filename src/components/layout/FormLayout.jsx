/**
 * FormLayout 컴포넌트
 * 통일된 form 레이아웃을 제공하는 공통 컴포넌트
 * 
 * @param {string} variant - 'default' | 'wide' | 'full' - 폼 너비 variant
 * @param {string} title - 폼 제목 (optional)
 * @param {ReactNode} children - 폼 내용
 * @param {string} className - 추가 클래스명
 * @param {function} onSubmit - form submit 핸들러 (optional)
 */

import './FormLayout.scss';

function FormLayout({
  variant = 'default',
  title,
  children,
  className = '',
  onSubmit,
  ...props
}) {
  const formClassName = `form-layout form-layout--${variant} ${className}`.trim();

  return (
    <form className={formClassName} onSubmit={onSubmit} {...props}>
      {title && (
        <div className="form-layout__header">
          <h2>{title}</h2>
        </div>
      )}
      <div className="form-layout__content">
        {children}
      </div>
    </form>
  );
}

export default FormLayout;

