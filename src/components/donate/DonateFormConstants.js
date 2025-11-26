// re-earth-frontend/src/components/donate/DonateFormConstants.js
// 기부 폼 공통 상수

export const DONATE_CATEGORIES = [
  { value: 'TOP', label: '상의' },
  { value: 'BOTTOM', label: '하의' },
  { value: 'OUTER', label: '아우터' },
  { value: 'SHOES', label: '신발' },
  { value: 'BAG', label: '가방' },
  { value: 'ETC', label: '기타' },
];

export const DONATE_CONDITIONS = [
  { value: 'GOOD', label: '상' },
  { value: 'NORMAL', label: '중' },
  { value: 'POOR', label: '하' },
];

export const DONATE_FORM_STEPS = {
  AGREEMENT: 1,
  PHONE_VERIFY: 2,
  ITEMS: 3,
  ADDRESS: 4,
  CONFIRM: 5,
};

export const DONATE_FORM_STEP_LABELS = {
  1: '동의 및 기본정보',
  2: '휴대폰 인증',
  3: '물품 입력',
  4: '수거 정보',
  5: '확인 및 제출',
};

export const DONATE_FORM_TOTAL_STEPS = 5;

