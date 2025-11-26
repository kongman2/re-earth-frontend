import Input from './Input';
import './Input.scss';

/**
 * @deprecated InputCheckPassword는 Input 컴포넌트의 'password' variant로 대체되었습니다.
 * 하위 호환성을 위해 유지되며, 새로운 코드에서는 Input 컴포넌트를 직접 사용하세요.
 */
function InputCheckPassword({
  marginTop,
  value1,
  value2,
  inputChange,
  showChangePasswordModal,
}) {
  return (
    <Input
      variant="password"
      marginTop={marginTop}
      onChange={inputChange}
      variantProps={{
        password1: value1,
        password2: value2,
        showChangePasswordModal,
      }}
    />
  );
}

export default InputCheckPassword;
