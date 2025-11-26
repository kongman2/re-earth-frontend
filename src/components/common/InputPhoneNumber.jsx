import Input from './Input';
import './Input.scss';

/**
 * @deprecated InputPhoneNumber는 Input 컴포넌트의 'phone' variant로 대체되었습니다.
 * 하위 호환성을 위해 유지되며, 새로운 코드에서는 Input 컴포넌트를 직접 사용하세요.
 */
function InputPhoneNumber({ marginTop, value1, value2, value3, inputChange }) {
   return (
      <Input
         variant="phone"
         marginTop={marginTop}
         onChange={inputChange}
         variantProps={{
            phone1: value1,
            phone2: value2,
            phone3: value3,
         }}
      />
   )
}

export default InputPhoneNumber
