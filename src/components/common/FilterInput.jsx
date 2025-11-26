/**
 * FilterInput 컴포넌트
 * 필터링용 input 컴포넌트
 */

import './FilterInput.scss';

function FilterInput({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  ...props
}) {
  return (
    <input
      type={type}
      className={`filter-input ${className}`.trim()}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default FilterInput;

