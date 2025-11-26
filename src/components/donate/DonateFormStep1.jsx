// re-earth-frontend/src/components/donate/DonateFormStep1.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '../../features/donationSlice';
import DonateFormLayout from './DonateFormLayout';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Input from '../common/Input';
import { DONATE_FORM_STEPS } from './DonateFormConstants';

export default function DonateFormStep1({ onNext, variant = 'default', className = '' }) {
  const dispatch = useDispatch();
  const { agreePolicy, donorName, donorEmail } = useSelector((s) => s.donation);
  const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null });

  const set = (k, v) => dispatch(setField({ key: k, value: v }));

  const showAlert = (message, variant = 'info', title = null) => {
    setAlert({ isOpen: true, message, variant, title });
  };

  const hideAlert = () => {
    setAlert({ isOpen: false, message: '', variant: 'info', title: null });
  };

  const handleNext = (e) => {
    e?.preventDefault();
    if (!agreePolicy) return;
    if (!donorName) {
      showAlert('이름을 입력하세요.', 'warning', '입력 오류');
      return;
    }
    onNext?.();
  };

  const actions = (
    <>
      <label className="donate-form__checkbox">
        <input
          type="checkbox"
          checked={!!agreePolicy}
          onChange={(e) => set('agreePolicy', e.target.checked)}
        />
        <span>개인정보 수집 및 이용에 동의합니다.</span>
      </label>
      <Button
        variant="main1"
        onClick={handleNext}
        disabled={!agreePolicy}
        className="donate-form__next-btn"
      >
        1/5 →
      </Button>
    </>
  );

  return (
    <>
      {alert.isOpen && (
        <Alert
          variant={alert.variant}
          title={alert.title}
          isModal={true}
          dismissible={true}
          onClose={hideAlert}
          size="sm"
        >
          {alert.message}
        </Alert>
      )}
      <DonateFormLayout
        currentStep={DONATE_FORM_STEPS.AGREEMENT}
        title="기부하기"
        variant={variant}
        className={className}
        actions={actions}
      >
      <div className="donate-form__notice">
        <p>
          <strong>① 기증 가능물품 확인</strong>
          <br />
          기증품은 매장에서 판매되거나 사회취약계층에게 전달되고 있습니다.
          <br />
          판매 수익금으로는 환경보호활동을 지원하고 있습니다.
          <br />
          소중한 기증품이 잘 활용될 수 있도록 기증 가능 물품을 꼭 확인해 주세요.
          <br />
          <br />
          <strong>② 기증품 수량확인</strong>
          <br />
          기증품을 포장하시거나 수량을 확인하신 경우 방문수거는 2박스부터 가능합니다.
          <br />
          (가로+세로+높이=125cm) 기준 3박스 이상부터 방문수거가 가능합니다.
          <br />
          <br />
          <strong>* 기업 대량/재고 기부</strong>는 리어스 콜센터 1533-1234로 문의 주시면 안내 도와드리겠습니다.
          <br />
          <br />
          기증 가능물품을 확인하고, 아래 동의 및 기본 정보를 입력하세요.
        </p>
      </div>

      <Input
        variant="default"
        label="이름"
        placeholder="이름을 입력하세요."
        type="text"
        name="donorName"
        value={donorName || ''}
        onChange={(e) => set('donorName', e.target.value)}
        required
        className="donate-form__input-group"
      />

      <Input
        variant="default"
        placeholder="이메일을 입력하세요."
        label="이메일 (선택)"
        type="email"
        name="donorEmail"
        value={donorEmail || ''}
        onChange={(e) => set('donorEmail', e.target.value)}
        className="donate-form__input-group"
      />

      <div className="donate-form__terms">
        <h4>개인정보 동의</h4>
        <textarea 
          rows={6} 
          readOnly 
          value={`[개인정보 수집 및 이용에 대한 동의]

Re:earth는 기증 신청 서비스 제공을 위해 아래와 같이 개인정보를 수집·이용합니다.
내용을 충분히 읽어보신 후 동의해 주시기 바랍니다.

① 수집 항목
- 필수: 이름, 휴대전화번호, 주소, 이메일
- 선택: 기부 관련 추가 문의사항

② 수집 및 이용 목적
- 기부 신청 접수 및 기부 내역 관리
- 기부 물품 수거 및 배송 진행 안내
- 기부금 영수증 발급 및 법적 의무 이행
- 서비스 관련 공지 및 고객 응대

③ 보유 및 이용 기간
- 기부 신청일로부터 3년간 보관 후 파기 (관련 법령에 따라 일정 기간 보존할 수 있음)

④ 동의 거부 권리 및 불이익
- 귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.
- 다만, 필수 항목에 대한 동의를 거부할 경우 기부 신청 서비스 이용이 제한될 수 있습니다.

본인은 위 내용을 확인하였으며, 개인정보 수집 및 이용에 동의합니다.`}
        />
      </div>
    </DonateFormLayout>
    </>
  );
}

