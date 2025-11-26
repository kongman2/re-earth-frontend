// re-earth-frontend/src/components/donate/DonateFormStep2.jsx
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPhonePart, sendOtpThunk, verifyOtpThunk } from '../../features/donationSlice';
import DonateFormLayout from './DonateFormLayout';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Input from '../common/Input';
import { DONATE_FORM_STEPS } from './DonateFormConstants';

export default function DonateFormStep2({ onNext, onVerified, variant = 'default', className = '' }) {
  const dispatch = useDispatch();
  const { phone, otp, loading, error } = useSelector((s) => s.donation);
  const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null });
  const [otpCode, setOtpCode] = useState('');

  const p1Ref = useRef(null);

  const showAlert = (message, variant = 'info', title = null) => {
    setAlert({ isOpen: true, message, variant, title });
  };

  const hideAlert = () => {
    setAlert({ isOpen: false, message: '', variant: 'info', title: null });
  };
  const p2Ref = useRef(null);
  const p3Ref = useRef(null);
  const onlyDigits = (v) => (v || '').replace(/\D/g, '');

  const handleChange = useCallback(
    (part, value) => {
      const v = onlyDigits(value);
      dispatch(setPhonePart({ part, value: v }));
    },
    [dispatch]
  );

  const handleAutoTab = (e, part) => {
    const v = onlyDigits(e.target.value);
    if (part === 'p1' && v.length >= 3) p2Ref.current?.focus();
    if (part === 'p2' && v.length >= 4) p3Ref.current?.focus();
  };

  const isValidPhone = useMemo(() => {
    const p1 = (phone?.p1 || '').trim();
    const p2 = (phone?.p2 || '').trim();
    const p3 = (phone?.p3 || '').trim();
    if (!/^01[016789]$/.test(p1)) return false;
    if (!/^\d{3,4}$/.test(p2)) return false;
    if (!/^\d{4}$/.test(p3)) return false;
    return true;
  }, [phone]);

  const fullPhone = useMemo(
    () => `${onlyDigits(phone?.p1)}${onlyDigits(phone?.p2)}${onlyDigits(phone?.p3)}`,
    [phone]
  );

  const requestOtp = () => {
    if (!isValidPhone) {
      showAlert('휴대폰 번호를 확인해 주세요.', 'warning', '입력 오류');
      return;
    }
    dispatch(sendOtpThunk(fullPhone));
  };

  const verifyOtp = async () => {
    const code = otpCode.trim();
    if (!code) {
      showAlert('인증번호를 입력해 주세요.', 'warning', '입력 오류');
      return;
    }
    const res = await dispatch(verifyOtpThunk({ phone: fullPhone, code }));
    if (res.meta.requestStatus === 'fulfilled' && res.payload?.verified) {
      onVerified?.(fullPhone);
    }
  };

  const goNext = () => {
    if (!otp?.verified) {
      showAlert('휴대폰 인증을 먼저 완료해 주세요.', 'warning', '인증 필요');
      return;
    }
    onNext?.();
  };

  const actions = (
    <Button
      variant="main1"
      onClick={goNext}
      disabled={!otp?.verified}
      className="donate-form__next-btn"
    >
      2/5 →
    </Button>
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
        currentStep={DONATE_FORM_STEPS.PHONE_VERIFY}
        title="휴대폰 문자 인증"
        variant={variant}
        className={className}
        actions={actions}
      >
      <Input
        variant="phone"
        label="휴대폰번호"
        onChange={(e) => {
          const name = e.target.name;
          let part = 'p1';
          if (name === 'phone2') part = 'p2';
          else if (name === 'phone3') part = 'p3';
          handleChange(part, e.target.value);
        }}
        variantProps={{
          phone1: phone?.p1 || '',
          phone2: phone?.p2 || '',
          phone3: phone?.p3 || '',
          phone1Ref: p1Ref,
          phone2Ref: p2Ref,
          phone3Ref: p3Ref,
          onPhone1Input: (e) => handleAutoTab(e, 'p1'),
          onPhone2Input: (e) => handleAutoTab(e, 'p2'),
          phoneButtonText: loading ? '요청 중…' : '인증 요청',
          phoneOnButtonClick: requestOtp,
          phoneButtonClassName: 'btn main1 default',
          phoneButtonDisabled: !isValidPhone || loading,
        }}
        className="donate-form__input-group"
      />

      <Input
        variant="withButton"
        label="인증번호"
        type="text"
        name="otp-code"
        value={otpCode}
        placeholder="인증번호입력"
        maxLength={6}
        onChange={(e) => setOtpCode(e.target.value)}
        variantProps={{
          buttonText: loading ? '확인 중…' : '입력',
          onButtonClick: verifyOtp,
          buttonClassName: 'btn main1 default',
        }}
        disabled={!otp?.sent || loading}
        className="donate-form__input-group"
      />
      {error && <p className="mt-10 text-danger">{error?.message || '요청 처리 중 오류가 발생했습니다.'}</p>}
      {otp?.verified && <p className="mt-10 text-success">인증 완료 🎉</p>}
    </DonateFormLayout>
    </>
  );
}

