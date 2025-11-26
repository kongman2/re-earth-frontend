// re-earth-frontend/src/components/finding/ReissuePasswordForm.jsx
import React from 'react';
import FindingFormLayout from './FindingFormLayout';
import Button from '../common/Button';

export default function ReissuePasswordForm({ onSubmit, variant = 'default', className = '' }) {
  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit?.();
  };

  const actions = (
    <Button variant="main1" type="submit" onClick={handleSubmit}>
      비밀번호 재발급
    </Button>
  );

  return (
    <FindingFormLayout title="비밀번호 재발급" variant={variant} className={className} actions={actions}>
      <form onSubmit={handleSubmit}>
        <div className="finding-form__input-group">
          <label className="finding-form__label finding-form__label--required">새 비밀번호</label>
          <input type="password" name="newPassword" placeholder="새 비밀번호를 입력하세요." required />
        </div>

        <div className="finding-form__input-group">
          <label className="finding-form__label finding-form__label--required">비밀번호 확인</label>
          <input type="password" name="confirmPassword" placeholder="비밀번호를 다시 입력하세요." required />
        </div>
      </form>
    </FindingFormLayout>
  );
}

