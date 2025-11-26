// re-earth-frontend/src/components/finding/FindIdSuccessForm.jsx
import React from 'react';
import FindingFormLayout from './FindingFormLayout';
import Button from '../common/Button';

export default function FindIdSuccessForm({ userId, onLogin, variant = 'default', className = '' }) {
  const actions = (
    <Button variant="main1" onClick={onLogin}>
      로그인하기
    </Button>
  );

  return (
    <FindingFormLayout variant={variant} className={className} actions={actions}>
      <div className="finding-form__message finding-form__message--success">
        <p>회원님의 아이디는 <strong>{userId}</strong> 입니다.</p>
      </div>
    </FindingFormLayout>
  );
}

