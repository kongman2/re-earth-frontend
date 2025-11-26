import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsThunk } from '../../features/itemSlice';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import FilterSelect from '../../components/common/FilterSelect';
import FilterInput from '../../components/common/FilterInput';
import Loading from '../../components/common/Loading';
import PointShop from '../../components/shop/PointShop';
import './PointShopPage.scss';

const CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'SELL', label: '판매중' },
  { value: 'SOLD_OUT', label: '품절' }
];

const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'latest', label: '최신순' },
  { value: 'price_low', label: '포인트 낮은순' },
  { value: 'price_high', label: '포인트 높은순' },
  { value: 'name', label: '이름순' }
];

// 페이지당 보여줄 상품 수
const ITEMS_PER_PAGE = 12;

export default function PointShopPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Redux 상태
  const { items, loading, error } = useSelector((state) => state.items);
  
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  // 필터링된 상품들
  const [filteredItems, setFilteredItems] = useState([]);

  // 컴포넌트 마운트 시 상품 데이터 가져오기
  useEffect(() => {
    dispatch(fetchItemsThunk());
  }, [dispatch]);

  // 필터링 로직
  useEffect(() => {
    if (!items) return;

    let filtered = [...items];

    // 카테고리 필터 (판매 상태 기준)
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.itemSellStatus === selectedCategory);
    }

    // 검색 키워드 필터
    if (searchKeyword.trim()) {
      filtered = filtered.filter(item => 
        item.itemNm.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (item.itemDetail && item.itemDetail.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        (item.itemSummary && item.itemSummary.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
    }

    // 가격 범위 필터
    if (priceRange.min) {
      filtered = filtered.filter(item => item.price >= parseInt(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(item => item.price <= parseInt(priceRange.max));
    }

    // 정렬
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.itemNm.localeCompare(b.itemNm));
        break;
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default: // 'popular'
        // 인기순 정렬 로직 (예: 판매 상태나 브랜드명 기준)
        filtered.sort((a, b) => {
          if (a.itemSellStatus === 'SELL' && b.itemSellStatus !== 'SELL') return -1;
          if (a.itemSellStatus !== 'SELL' && b.itemSellStatus === 'SELL') return 1;
          return a.brandName.localeCompare(b.brandName);
        });
        break;
    }

    setFilteredItems(filtered);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  }, [items, selectedCategory, searchKeyword, priceRange, sortBy]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // 필터 초기화
  const resetFilters = () => {
    setSelectedCategory('all');
    setSortBy('popular');
    setSearchKeyword('');
    setPriceRange({ min: '', max: '' });
    setCurrentPage(1);
  };

  return (
    <div className="user-page bg-white">
      <div className="container">
          {/* 메인 콘텐츠 */}
            <div className="pointshop-content p-3">
              {/* 헤더 */}
              <div className="content-header">
                <h2 className="page-title">PointShop</h2>
              </div>

              {/* 필터 바 */}
              <div className="filter-bar">
                <div className="row align-items-center g-3">
                  <div className="col-lg-8 col-md-12">
                    <div className="filter-controls d-flex flex-wrap gap-3">
                      {/* 카테고리 선택 */}
                      <FilterSelect
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        options={CATEGORIES}
                      />

                      {/* 정렬 선택 */}
                      <FilterSelect
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        options={SORT_OPTIONS}
                      />

                      {/* 검색 */}
                      <FilterInput
                        type="text"
                        placeholder="상품 검색..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />

                      {/* 가격 범위 */}
                      <div className="price-range d-flex align-items-center gap-2">
                        <FilterInput
                          type="number"
                          placeholder="최소"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                          className="price-range-input"
                        />
                        <span className="price-range-separator">~</span>
                        <FilterInput
                          type="number"
                          placeholder="최대"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                          className="price-range-input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 text-lg-end text-md-start">
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={resetFilters}
                      className="pointshop-reset-btn"
                    >
                      <iconify-icon icon="mdi:refresh" width="16" height="16"></iconify-icon>
                      필터 초기화
                    </Button>
                  </div>
                </div>
              </div>

              {/* 상품 그리드 */}
              <div className="products-grid">
                {loading ? (
                  <div className="text-center py-5">
                    <Loading variant="spinner" text="상품을 불러오는 중..." />
                  </div>
                ) : error ? (
                  <div className="text-center py-5">
                    <iconify-icon icon="mdi:alert-circle" width="64" height="64" className="pointshop-error-icon"></iconify-icon>
                    <h5 className="mt-3 pointshop-error-title">오류가 발생했습니다</h5>
                    <p className="pointshop-error-text">{error}</p>
                    <Button 
                      variant="main1" 
                      className="mt-3" 
                      onClick={() => dispatch(fetchItemsThunk())}
                    >
                      다시 시도
                    </Button>
                  </div>
                ) : currentItems.length > 0 ? (
                  <PointShop items={currentItems} loading={loading} error={error} />
                ) : (
                  <div className="no-products text-center py-5">
                    <iconify-icon icon="mdi:package-variant" width="64" height="64" className="pointshop-empty-icon"></iconify-icon>
                    <h5 className="mt-3 pointshop-empty-title">상품이 없습니다.</h5>
                    <p className="pointshop-empty-text">
                      {searchKeyword || selectedCategory !== 'all' || priceRange.min || priceRange.max 
                        ? '검색 조건에 맞는 상품이 없습니다.' 
                        : '등록된 상품이 없습니다.'}
                    </p>
                  </div>
                )}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination 
                    pagination={{
                      currentPage,
                      totalPages,
                      onPageChange: setCurrentPage
                    }}
                  />
                </div>
              )}

              {/* 추천 상품 */}
              {!loading && !error && filteredItems.length > 0 && (
                <div className="recommended-products mt-5">
                  <h4>추천 상품</h4>
                  <PointShop items={filteredItems.slice(0, 4)} />
                </div>
              )}
          </div>
        </div>
    </div>
  );
}
