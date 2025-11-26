// re-earth-frontend/src/components/donate/DonateFormStep3.jsx
import React from 'react';
import DonateFormLayout from './DonateFormLayout';
import Button from '../common/Button';
import FormSelect from '../common/FormSelect';
import Input from '../common/Input';
import { DONATE_FORM_STEPS, DONATE_CATEGORIES, DONATE_CONDITIONS } from './DonateFormConstants';

export default function DonateFormStep3({ items, onAdd, onRemove, onPatch, onPrev, onNext, variant = 'default', className = '' }) {
  const actions = (
    <>
      <Button variant="outline-secondary" onClick={onPrev}>
        이전
      </Button>
      <Button variant="outline-dark" onClick={onAdd}>
        물품 추가
      </Button>
      <Button variant="dark" onClick={onNext} className="ms-auto">
        다음
      </Button>
    </>
  );

  return (
    <DonateFormLayout
      currentStep={DONATE_FORM_STEPS.ITEMS}
      title="기부 물품"
      variant={variant}
      className={className}
      actions={actions}
    >
      {(items || []).map((it, idx) => (
        <div key={idx} className="card p-3 mb-2">
          <div className="row g-2">
            <div className="col-6 col-md-3">
              <FormSelect
                label="분류"
                value={it.category || ''}
                onChange={(e) => onPatch(idx, 'category', e.target.value)}
                options={DONATE_CATEGORIES}
              />
            </div>
            <div className="col-6 col-md-3">
              <FormSelect
                label="상태"
                value={it.condition || ''}
                onChange={(e) => onPatch(idx, 'condition', e.target.value)}
                options={DONATE_CONDITIONS}
              />
            </div>
            <div className="col-6 col-md-2">
              <Input
                variant="default"
                label="수량"
                placeholder="수량을 입력하세요."
                type="number"
                name={`quantity-${idx}`}
                value={it.quantity || 1}
                min={1}
                onChange={(e) => onPatch(idx, 'quantity', Math.max(1, Number(e.target.value || 1)))}
              />
            </div>
            <div className="col-12 col-md-4">
              <Input
                variant="default"
                label="비고"
                type="text"
                name={`note-${idx}`}
                value={it.note || ''}
                onChange={(e) => onPatch(idx, 'note', e.target.value)}
                placeholder="브랜드/사이즈 등"
              />
            </div>
          </div>
          <div className="text-end mt-2">
            <Button variant="outline-danger" size="sm" onClick={() => onRemove(idx)}>
              삭제
            </Button>
          </div>
        </div>
      ))}
    </DonateFormLayout>
  );
}

