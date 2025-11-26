// re-earth-frontend/src/components/finding/FindIdFailForm.jsx
import React from 'react';
import FindingFormLayout from './FindingFormLayout';
import Button from '../common/Button';

export default function FindIdFailForm({ onRetry, onSignup, variant = 'default', className = '' }) {
  const actions = (
    <>
      <Button variant="outline-secondary" onClick={onRetry}>
        다시 찾기
      </Button>
      <Button variant="main1" onClick={onSignup}>
        회원가입
      </Button>
    </>
  );

  return (
    <FindingFormLayout variant={variant} className={className} actions={actions}>
      <div className="finding-form__message finding-form__message--error">
        <p>입력하신 정보와 일치하는 회원이 없습니다.</p>
      </div>
    </FindingFormLayout>
  );
}

