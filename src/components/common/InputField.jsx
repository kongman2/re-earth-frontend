import Input from './Input';
import './Input.scss';

/**
 * @deprecated InputField는 Input 컴포넌트의 'default' variant로 대체되었습니다.
 * 하위 호환성을 위해 유지되며, 새로운 코드에서는 Input 컴포넌트를 직접 사용하세요.
 */
function InputField({ 
   label, 
   type = 'text', 
   name, 
   value, 
   placeholder, 
   inputChange, 
   marginTop, 
   disabled, 
   required, 
   autoComplete,
   maxLength,
   min,
   rows,
   className = '',
   ...props 
}) {
   return (
      <Input
         variant="default"
         label={label}
         type={type}
         name={name}
         value={value}
         placeholder={placeholder}
         onChange={inputChange}
         marginTop={marginTop}
         disabled={disabled}
         required={required}
         autoComplete={autoComplete}
         maxLength={maxLength}
         min={min}
         rows={rows}
         className={className}
         {...props}
      />
   )
}

export default InputField
