import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import './TableContent.scss';

const TableContent = ({ 
  title, 
  subTabs, 
  activeSubTab, 
  onSubTabChange, 
  columns, 
  data, 
  onDetailsClick,
  currentPage = 1,
  totalPages = 3,
  onPageChange 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [dateFilters, setDateFilters] = useState({});
  const [productFilters, setProductFilters] = useState({});
  const [quantityFilters, setQuantityFilters] = useState({});
  const [amountFilters, setAmountFilters] = useState({});
  const filterDropdownRef = useRef(null);

  // 필터 옵션 생성 (각 컬럼별로 고유한 값들 추출)
  const getFilterOptions = (column) => {
    const uniqueValues = [...new Set(data.map(row => row[column]).filter(value => value))];
    return uniqueValues;
  };

  // 날짜 컬럼인지 확인하는 함수
  const isDateColumn = (column) => {
    const dateKeywords = ['날짜', 'date', '등록일', '작성일', '생성일', '주문일자', '기부일자'];
    return dateKeywords.some(keyword => 
      column.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // 제목 컬럼인지 확인하는 함수
  const isTitleColumn = (column) => {
    const titleKeywords = ['제목', 'title', '상품명', '물품명', '이름'];
    return titleKeywords.some(keyword => 
      column.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // 물품 컬럼인지 확인하는 함수
  const isProductColumn = (column) => {
    const productKeywords = ['물품', 'product', '상품'];
    return productKeywords.some(keyword => 
      column.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // 수량 컬럼인지 확인하는 함수
  const isQuantityColumn = (column) => {
    const quantityKeywords = ['수량', 'quantity'];
    return quantityKeywords.some(keyword => 
      column.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // 금액/포인트 컬럼인지 확인하는 함수
  const isAmountColumn = (column) => {
    const amountKeywords = ['금액', '포인트', 'amount', 'point', 'price', '결제', '적립'];
    return amountKeywords.some(keyword => 
      column.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // 물품 옵션 생성
  const getProductOptions = () => {
    const productColumn = columns.find(col => isProductColumn(col));
    if (!productColumn) return [];
    
    const products = [];
    data.forEach(row => {
      const product = row[productColumn];
      if (product) {
        products.push(product);
      }
    });
    
    return [...new Set(products)];
  };

  // 수량 옵션 생성
  const getQuantityOptions = () => {
    const quantityColumn = columns.find(col => isQuantityColumn(col));
    if (!quantityColumn) return [];
    
    const quantities = [];
    data.forEach(row => {
      const quantity = row[quantityColumn];
      if (quantity) {
        quantities.push(quantity);
      }
    });
    
    return [...new Set(quantities)];
  };

  // 필터링된 데이터 생성
  const getFilteredData = () => {
    const allFilters = { ...filters, ...dateFilters, ...productFilters, ...quantityFilters, ...amountFilters };
    if (Object.keys(allFilters).length === 0) return data;
    
    return data.filter(row => {
      return Object.entries(allFilters).every(([column, filterValue]) => {
        if (!filterValue) return true;
        
        // 날짜 필터링
        if (isDateColumn(column) && filterValue.includes('~')) {
          const [startDate, endDate] = filterValue.split('~').map(d => d.trim());
          const rowDate = new Date(row[column]);
          const start = new Date(startDate);
          const end = new Date(endDate);
          return rowDate >= start && rowDate <= end;
        }
        
        // 제목 필터링 (부분 일치)
        if (isTitleColumn(column)) {
          return row[column] && row[column].toString().toLowerCase().includes(filterValue.toLowerCase());
        }
        
        // 물품 필터링
        if (column === 'product') {
          const productColumn = columns.find(col => isProductColumn(col));
          if (productColumn) {
            return row[productColumn] === filterValue;
          }
        }
        
        // 수량 필터링
        if (column === 'quantity') {
          const quantityColumn = columns.find(col => isQuantityColumn(col));
          if (quantityColumn) {
            return row[quantityColumn] === filterValue;
          }
        }
        
        // 금액/포인트 범위 필터링
        if (isAmountColumn(column) && filterValue.includes('~')) {
          const [minAmount, maxAmount] = filterValue.split('~').map(v => v.trim());
          const rowValue = row[column];
          if (rowValue) {
            // 숫자만 추출 (7,000P → 7000, 25,000원 → 25000)
            const numericValue = parseInt(rowValue.replace(/[^\d]/g, ''));
            const min = minAmount ? parseInt(minAmount) : 0;
            const max = maxAmount ? parseInt(maxAmount) : Infinity;
            return numericValue >= min && numericValue <= max;
          }
        }
        
        // 기본 필터링
        return row[column] && row[column].toString().toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  };

  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const handleDateFilterChange = (column, startDate, endDate) => {
    setDateFilters(prev => ({
      ...prev,
      [column]: startDate && endDate ? `${startDate}~${endDate}` : ''
    }));
  };

  const handleProductChange = (value) => {
    setProductFilters(prev => ({
      ...prev,
      product: value
    }));
  };

  const handleQuantityChange = (value) => {
    setQuantityFilters(prev => ({
      ...prev,
      quantity: value
    }));
  };

  const handleAmountFilterChange = (column, minAmount, maxAmount) => {
    setAmountFilters(prev => ({
      ...prev,
      [column]: minAmount && maxAmount ? `${minAmount}~${maxAmount}` : ''
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setDateFilters({});
    setProductFilters({});
    setQuantityFilters({});
    setAmountFilters({});
  };

  const filteredData = getFilteredData();

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="table-content">
      <h2 className="table-content__title">{title}</h2>
      
      <div className="table-content__main">
        {/* 서브 탭 */}
        {subTabs && subTabs.length > 0 && (
          <div className="table-content__sub-tabs">
            {subTabs.map((subTab) => (
              <button
                key={subTab.id}
                className={`table-content__sub-tab ${activeSubTab === subTab.id ? 'table-content__sub-tab--active' : ''}`}
                onClick={() => onSubTabChange(subTab.id)}
              >
                {subTab.label}
              </button>
            ))}
          </div>
        )}

        {/* 테이블 영역 */}
        <div className="table-content__table-area">
          {/* 필터링바 */}
          <div className="table-content__filter-bar mb-3">
              <div className="table-content__filter-content">
                <div className="table-content__filter-dropdown" ref={filterDropdownRef}>
                  <button 
                    className="table-content__filter-toggle"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="table-content__filter-icon">
                      <rect width="24" height="24" fill="none"/>
                      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 8.5h11m-18 0a2 2 0 1 0 4 0a2 2 0 0 0-4 0m0 7h11m3 0a2 2 0 1 0 4 0a2 2 0 0 0-4 0"/>
                    </svg>
                  </button>
                  
                  {isFilterOpen && (
                    <div className="table-content__filter-menu">
                      <div className="table-content__filter-header">
                        <span>필터 옵션</span>
                        <button 
                          className="table-content__filter-clear"
                          onClick={clearFilters}
                        >
                          전체 해제
                        </button>
                      </div>
                      
                      <div className="table-content__filter-options">
                        {/* 물품 필터 */}
                        {columns.some(col => isProductColumn(col)) && (
                          <div className="table-content__filter-group">
                            <label className="table-content__filter-label">물품</label>
                            <select
                              className="filter-select"
                              value={productFilters.product || ''}
                              onChange={(e) => handleProductChange(e.target.value)}
                            >
                              <option value="">전체</option>
                              {getProductOptions().map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        
                        {/* 수량 필터 */}
                        {columns.some(col => isQuantityColumn(col)) && (
                          <div className="table-content__filter-group">
                            <label className="table-content__filter-label">수량</label>
                            <select
                              className="filter-select"
                              value={quantityFilters.quantity || ''}
                              onChange={(e) => handleQuantityChange(e.target.value)}
                            >
                              <option value="">전체</option>
                              {getQuantityOptions().map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        
                        {columns.map((column) => {
                          const options = getFilterOptions(column);
                          const isDate = isDateColumn(column);
                          const isTitle = isTitleColumn(column);
                          const isProduct = isProductColumn(column);
                          const isQuantity = isQuantityColumn(column);
                          const isAmount = isAmountColumn(column);
                          
                          // 물품이나 수량 컬럼은 조합 필터에서 처리하므로 건너뛰기
                          if (isProduct || isQuantity) return null;
                          
                          // 날짜 컬럼인 경우
                          if (isDate) {
                            const currentDateFilter = dateFilters[column] || '';
                            const [startDate, endDate] = currentDateFilter ? currentDateFilter.split('~') : ['', ''];
                            
                            return (
                              <div key={column} className="table-content__filter-group">
                                <label className="table-content__filter-label">{column}</label>
                                <div className="table-content__date-range">
                                  <input
                                    type="date"
                                    className="filter-input"
                                    value={startDate}
                                    onChange={(e) => handleDateFilterChange(column, e.target.value, endDate)}
                                    placeholder="시작일"
                                  />
                                  <span className="table-content__date-separator">~</span>
                                  <input
                                    type="date"
                                    className="filter-input"
                                    value={endDate}
                                    onChange={(e) => handleDateFilterChange(column, startDate, e.target.value)}
                                    placeholder="종료일"
                                  />
                                </div>
                              </div>
                            );
                          }
                          
                          // 금액/포인트 컬럼인 경우 (범위 입력)
                          if (isAmount) {
                            const currentAmountFilter = amountFilters[column] || '';
                            const [minAmount, maxAmount] = currentAmountFilter ? currentAmountFilter.split('~') : ['', ''];
                            
                            return (
                              <div key={column} className="table-content__filter-group">
                                <label className="table-content__filter-label">{column} 범위</label>
                                <div className="table-content__amount-range">
                                  <input
                                    type="number"
                                    className="filter-input"
                                    value={minAmount}
                                    onChange={(e) => handleAmountFilterChange(column, e.target.value, maxAmount)}
                                    placeholder="최소"
                                  />
                                  <span className="table-content__amount-separator">~</span>
                                  <input
                                    type="number"
                                    className="filter-input"
                                    value={maxAmount}
                                    onChange={(e) => handleAmountFilterChange(column, minAmount, e.target.value)}
                                    placeholder="최대"
                                  />
                                </div>
                              </div>
                            );
                          }
                          
                          // 제목 컬럼인 경우 (검색창)
                          if (isTitle) {
                            return (
                              <div key={column} className="table-content__filter-group">
                                <label className="table-content__filter-label">{column} 검색</label>
                                <input
                                  type="text"
                                  className="filter-input"
                                  value={filters[column] || ''}
                                  onChange={(e) => handleFilterChange(column, e.target.value)}
                                  placeholder={`${column}을 입력하세요`}
                                />
                              </div>
                            );
                          }
                          
                          // 일반 컬럼인 경우
                          if (options.length <= 1) return null; // 옵션이 1개 이하면 필터링 불필요
                          
                          return (
                            <div key={column} className="table-content__filter-group">
                              <label className="table-content__filter-label">{column}</label>
                              <select
                                className="filter-select"
                                value={filters[column] || ''}
                                onChange={(e) => handleFilterChange(column, e.target.value)}
                              >
                                <option value="">전체</option>
                                {options.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
          </div>

          {/* 테이블 */}
          <div className="table-content__table-container">
            <table className="table-content__table">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>
                        {column === '상세' || column === '주문 상세' || column === '상태' || column === '답변완료' || column === '확인 중' || column === '대기' || column === '승인' ? (
                          <button 
                            className="table-content__details-link"
                            onClick={() => onDetailsClick && onDetailsClick(row)}
                          >
                            {row[column] || '자세히 보기'}
                          </button>
                        ) : (
                          row[column]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="table-content__pagination">
        <button 
          className="table-content__pagination-btn"
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <Icon icon="mdi:chevron-left" width={24} height={24} />
        </button>
        
        <div className="table-content__pagination-pages">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`table-content__pagination-page ${currentPage === page ? 'table-content__pagination-page--active' : ''}`}
              onClick={() => onPageChange && onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button 
          className="table-content__pagination-btn"
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <Icon icon="mdi:chevron-right" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default TableContent;
