import React, { useState, useRef, useEffect } from 'react';
import './AdminFilter.scss';

const AdminFilter = ({ options, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const dropdownRef = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="admin-filter">
      <div className="admin-filter__header">
        <div className="admin-filter__dropdown" ref={dropdownRef}>
          <button 
            className="admin-filter__toggle btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M3 6h18M7 12h10M11 18h2" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </button>
          
          {isOpen && (
            <div className="admin-filter__menu">
              <div className="admin-filter__menu-header">
                <span>필터 옵션</span>
                <button 
                  className="admin-filter__clear"
                  onClick={clearAllFilters}
                >
                  전체 해제
                </button>
              </div>
              
              <div className="admin-filter__options">
                {Object.entries(options).map(([key, config]) => (
                  <div key={key} className="admin-filter__group">
                    <label className="admin-filter__label">{config.label}</label>
                    
                    {config.type === 'select' && (
                      <select
                        className="admin-filter__select"
                        value={filters[key] || ''}
                        onChange={(e) => handleFilterUpdate(key, e.target.value)}
                      >
                        <option value="">전체</option>
                        {config.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                    
                    {config.type === 'input' && (
                      <input
                        type="text"
                        className="admin-filter__input"
                        value={filters[key] || ''}
                        onChange={(e) => handleFilterUpdate(key, e.target.value)}
                        placeholder={config.placeholder}
                      />
                    )}
                    
                    {config.type === 'date' && (
                      <div className="admin-filter__date-range">
                        <input
                          type="date"
                          className="admin-filter__date"
                          value={filters[`${key}_start`] || ''}
                          onChange={(e) => handleFilterUpdate(`${key}_start`, e.target.value)}
                        />
                        <span>~</span>
                        <input
                          type="date"
                          className="admin-filter__date"
                          value={filters[`${key}_end`] || ''}
                          onChange={(e) => handleFilterUpdate(`${key}_end`, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFilter;
