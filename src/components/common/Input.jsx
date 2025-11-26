/**
 * 통합 Input 컴포넌트
 * variant에 따라 다양한 입력 타입을 지원합니다.
 * 
 * @param {string} variant - 'default' | 'address' | 'password' | 'phone' | 'withButton'
 * @param {string} label - 라벨 텍스트
 * @param {string} type - input type (text, email, tel, password 등)
 * @param {string} name - input name 속성
 * @param {string|object} value - 단일 값 또는 객체 (variant에 따라)
 * @param {string} placeholder - placeholder 텍스트
 * @param {function} onChange - onChange 핸들러
 * @param {string} marginTop - 상단 마진 클래스
 * @param {boolean} disabled - 비활성화 여부
 * @param {boolean} required - 필수 여부
 * @param {string} className - 추가 클래스명
 * @param {object} variantProps - variant별 특수 props
 */

function Input({
  variant = 'default',
  label,
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  marginTop,
  disabled,
  required,
  className = '',
  autoComplete,
  maxLength,
  min,
  rows,
  // variant별 특수 props
  variantProps = {},
  // ref 지원
  inputRef,
  ...props
}) {
  // variant: 'withButton' 관련 props
  const {
    buttonText,
    onButtonClick,
    buttonClassName = 'btn main1 check default',
  } = variantProps;

  // variant: 'address' 관련 props
  const {
    address1,
    address2,
    onAddressSearch,
  } = variantProps;

  // variant: 'password' 관련 props
  const {
    password1,
    password2,
    showChangePasswordModal = false,
  } = variantProps;

  // variant: 'phone' 관련 props
  const {
    phone1,
    phone2,
    phone3,
    phoneButtonText,
    phoneOnButtonClick,
    phoneButtonClassName = 'btn main1 default',
    phoneButtonDisabled = false,
    phone1Ref,
    phone2Ref,
    phone3Ref,
    onPhone1Input,
    onPhone2Input,
  } = variantProps;

  const baseClassName = `form--input ${marginTop || ''} ${className}`.trim();

  // Label 렌더링
  const renderLabel = () => {
    if (!label) return null;
    return (
      <p className="text-body">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </p>
    );
  };

  // Default variant: 기본 input 또는 textarea
  if (variant === 'default') {
    return (
      <div className={baseClassName}>
        {renderLabel()}
        {type === 'textarea' ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required || false}
            rows={rows || 3}
            maxLength={maxLength}
            {...props}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required || false}
            autoComplete={autoComplete}
            maxLength={maxLength}
            min={min}
            {...props}
          />
        )}
      </div>
    );
  }

  // WithButton variant: 버튼이 있는 input
  if (variant === 'withButton') {
    return (
      <div className={baseClassName}>
        {renderLabel()}
        <div className="with-btn">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required || false}
            {...props}
          />
          <button
            type="button"
            className={buttonClassName}
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  }

  // Address variant: 주소 입력 (2개 input + 검색 버튼)
  if (variant === 'address') {
    return (
      <div className={baseClassName}>
        <p className="text-body">주소/우편번호</p>
        <div className="with-btn">
          <input
            type="text"
            name="addr1"
            placeholder="기본 주소"
            value={address1 || value?.addr1 || ''}
            onChange={onChange}
          />
          <button
            type="button"
            className="btn main1 default"
            onClick={onAddressSearch}
          >
            검색
          </button>
        </div>
        <input
          type="text"
          name="addr2"
          placeholder="상세 주소를 입력하세요."
          className="mt-10"
          value={address2 || value?.addr2 || ''}
          onChange={onChange}
          required
        />
      </div>
    );
  }

  // Password variant: 비밀번호 확인 (2개 password input)
  if (variant === 'password') {
    const password1Name = showChangePasswordModal ? 'newPassword' : 'password';
    const password2Name = showChangePasswordModal ? 'confirmPassword' : 'check-password';
    
    return (
      <div className={baseClassName}>
        <p className="text-body">비밀번호</p>
        <div className="password-check">
          <input
            type="password"
            name={password1Name}
            placeholder="8자 이상, 영문, 숫자, 특수문자 모두 포함"
            value={password1 || value?.password1 || ''}
            onChange={onChange}
            required
          />
          <input
            type="password"
            name={password2Name}
            placeholder="비밀번호를 한 번 더 입력하세요."
            value={password2 || value?.password2 || ''}
            onChange={onChange}
            required
          />
        </div>
      </div>
    );
  }

  // Phone variant: 전화번호 입력 (3개 input + 선택적 버튼)
  if (variant === 'phone') {
    return (
      <div className={baseClassName}>
        {renderLabel()}
        <div className="input-phone">
          <input
            ref={phone1Ref}
            type="tel"
            inputMode="numeric"
            pattern="\d*"
            maxLength={3}
            name="phone1"
            placeholder="010"
            value={phone1 || value?.phone1 || ''}
            onChange={onChange}
            onInput={onPhone1Input}
            disabled={disabled}
            {...props}
          />
          <span>-</span>
          <input
            ref={phone2Ref}
            type="tel"
            inputMode="numeric"
            pattern="\d*"
            maxLength={4}
            name="phone2"
            placeholder="1234"
            value={phone2 || value?.phone2 || ''}
            onChange={onChange}
            onInput={onPhone2Input}
            disabled={disabled}
            {...props}
          />
          <span>-</span>
          <input
            ref={phone3Ref}
            type="tel"
            inputMode="numeric"
            pattern="\d*"
            maxLength={4}
            name="phone3"
            placeholder="5678"
            value={phone3 || value?.phone3 || ''}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
          {phoneButtonText && phoneOnButtonClick && (
            <button
              type="button"
              className={phoneButtonClassName}
              onClick={phoneOnButtonClick}
              disabled={phoneButtonDisabled || disabled}
            >
              {phoneButtonText}
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default Input;

