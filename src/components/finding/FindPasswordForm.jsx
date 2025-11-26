// re-earth-frontend/src/components/finding/FindPasswordForm.jsx
import React from 'react';
import FindingFormLayout from './FindingFormLayout';
import Button from '../common/Button';

export default function FindPasswordForm({ onSubmit, variant = 'default', className = '' }) {
  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit?.();
  };

  const actions = (
    <Button variant="main1" type="submit" onClick={handleSubmit}>
      찾기
    </Button>
  );

  return (
    <FindingFormLayout title="비밀번호 찾기" variant={variant} className={className} actions={actions}>
      <form onSubmit={handleSubmit}>
        <div className="finding-form__input-group">
          <label className="finding-form__label">이메일</label>
          <input type="email" name="email" placeholder="이메일을 입력하세요." required />
        </div>

        <div className="finding-form__input-group">
          <label className="finding-form__label">휴대폰번호</label>
          <div className="finding-form__phone-input">
            <input type="tel" name="phone1" placeholder="010" maxLength={3} />
            <span>-</span>
            <input type="tel" name="phone2" placeholder="1234" maxLength={4} />
            <span>-</span>
            <input type="tel" name="phone3" placeholder="5678" maxLength={4} />
          </div>
        </div>
      </form>
    </FindingFormLayout>
  );
}

