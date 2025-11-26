// re-earth-frontend/src/components/donate/DonateFormStep4.jsx
import React from 'react';
import DonateFormLayout from './DonateFormLayout';
import Button from '../common/Button';
import Input from '../common/Input';
import { DONATE_FORM_STEPS } from './DonateFormConstants';

export default function DonateFormStep4({ value, onChange, onPrev, onNext, variant = 'default', className = '' }) {
  const v = value || {};
  const handle = (e) => onChange?.({ [e.target.name]: e.target.value });

  const actions = (
    <>
      <Button variant="outline-secondary" onClick={onPrev}>
        이전
      </Button>
      <Button variant="dark" onClick={onNext} className="ms-auto">
        다음
      </Button>
    </>
  );

  return (
    <DonateFormLayout
      currentStep={DONATE_FORM_STEPS.ADDRESS}
      title="수거 정보"
      variant={variant}
      className={className}
      actions={actions}
    >
      <div className="row g-2">
        <div className="col-4">
          <Input
            variant="default"
            label="우편번호"
            type="text"
            name="zipcode"
            value={v.zipcode || ''}
            onChange={handle}
            placeholder="우편번호를 입력하세요."
            required
          />
        </div>
        <div className="col-8">
          <Input
            variant="default"
            label="주소"
            type="text"
            name="address1"
            value={v.address1 || ''}
            onChange={handle}
            required
            placeholder="기본 주소를 입력하세요."
          />
        </div>
        <div className="col-12">
          <Input
            variant="default"
            label="상세주소"
            type="text"
            name="address2"
            value={v.address2 || ''}
            onChange={handle}
            placeholder="상세 주소를 입력하세요."
          />
        </div>
      </div>

      <Input
        variant="default"
        label="수거 예정일"
        type="date"
        name="pickupDate"
        value={v.pickupDate || ''}
        onChange={handle}
        required
        className="donate-form__input-group"
        placeholder="수거 예정일을 선택하세요."
      />

      <Input
        variant="default"
        label="메모"
        type="textarea"
        name="memo"
        value={v.memo || ''}
        onChange={handle}
        placeholder="경비실 맡김/문 앞 놓기 둘 중 하나를 입력하세요."
        rows={3}
        className="donate-form__input-group"
      />
    </DonateFormLayout>
  );
}

