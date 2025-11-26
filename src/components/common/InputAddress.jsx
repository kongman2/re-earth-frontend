import Input from './Input';
import './Input.scss';

/**
 * @deprecated InputAddress는 Input 컴포넌트의 'address' variant로 대체되었습니다.
 * 하위 호환성을 위해 유지되며, 새로운 코드에서는 Input 컴포넌트를 직접 사용하세요.
 */
function InputAddress({ marginTop, value1, value2, inputChange, onAddressSearch }) {
   return (
      <Input
         variant="address"
         marginTop={marginTop}
         onChange={inputChange}
         variantProps={{
            address1: value1,
            address2: value2,
            onAddressSearch: onAddressSearch || (() => {}),
         }}
      />
   )
}

export default InputAddress
