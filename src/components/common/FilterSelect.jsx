/**
 * FilterSelect 컴포넌트
 * 필터링용 select 컴포넌트
 */

import './FilterSelect.scss';

function FilterSelect({
  value,
  onChange,
  options = [],
  placeholder,
  className = '',
  ...props
}) {
  return (
    <select
      className={`filter-select ${className}`.trim()}
      value={value}
      onChange={onChange}
      {...props}
    >
      {placeholder && (
        <option value="">{placeholder}</option>
      )}
      {options.map((option, index) => {
        const optionValue = typeof option === 'object' ? option.value : option;
        const optionLabel = typeof option === 'object' ? option.label : option;
        
        return (
          <option key={index} value={optionValue}>
            {optionLabel}
          </option>
        );
      })}
    </select>
  );
}

export default FilterSelect;

