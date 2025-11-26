import Input from './Input';
import './Input.scss';

/**
 * @deprecated InputWithBtn는 Input 컴포넌트의 'withButton' variant로 대체되었습니다.
 * 하위 호환성을 위해 유지되며, 새로운 코드에서는 Input 컴포넌트를 직접 사용하세요.
 */
function InputWithBtn({ label, type, name, value, placeholder, inputChange, handleClick, buttonText, marginTop, disabled, required }) {
   return (
      <Input
         variant="withButton"
         label={label}
         type={type}
         name={name}
         value={value}
         placeholder={placeholder}
         onChange={inputChange}
         marginTop={marginTop}
         disabled={disabled}
         required={required}
         variantProps={{
            buttonText,
            onButtonClick: handleClick,
         }}
      />
   )
}

export default InputWithBtn
