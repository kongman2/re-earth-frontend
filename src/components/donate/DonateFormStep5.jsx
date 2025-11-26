// re-earth-frontend/src/components/donate/DonateFormStep5.jsx
import React from 'react';
import DonateFormLayout from './DonateFormLayout';
import Button from '../common/Button';
import { DONATE_FORM_STEPS } from './DonateFormConstants';

export default function DonateFormStep5({ value, onPrev, onSubmit, onAgree, loading, variant = 'default', className = '' }) {
  const v = value || {};
  const onToggle = (e) => onAgree?.(e.target.checked);

  const actions = (
    <>
      <Button variant="outline-secondary" onClick={onPrev} disabled={loading}>
        이전
      </Button>
      <Button variant="dark" onClick={onSubmit} disabled={loading} className="ms-auto">
        {loading ? '제출 중...' : '신청 완료'}
      </Button>
    </>
  );

  return (
    <DonateFormLayout
      currentStep={DONATE_FORM_STEPS.CONFIRM}
      title="확인 및 동의"
      variant={variant}
      className={className}
      actions={actions}
    >
      <div className="card p-3 mb-3">
        <div>
          <strong>신청자:</strong> {v.donorName} / {v.donorPhone} {v.donorEmail && ` / ${v.donorEmail}`}
        </div>
        <div>
          <strong>주소:</strong> ({v.zipcode}) {v.address1} {v.address2}
        </div>
        <div>
          <strong>수거 예정일:</strong> {v.pickupDate}
        </div>
        <div>
          <strong>메모:</strong> {v.memo || '-'}
        </div>
        <hr />
        <div>
          <strong>물품</strong>
        </div>
        <ul className="mb-0">
          {(v.items || []).map((it, idx) => (
            <li key={idx}>
              [{it.category}] 상태:{it.condition} 수량:{it.quantity} {it.note && `(${it.note})`}
            </li>
          ))}
        </ul>
      </div>

      <label className="donate-form__checkbox">
        <input
          type="checkbox"
          checked={!!v.agreePolicy}
          onChange={onToggle}
        />
        <span>개인정보 처리 및 수거 정책에 동의합니다. (필수)</span>
      </label>
    </DonateFormLayout>
  );
}

