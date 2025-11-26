// re-earth-frontend/src/components/inquiry/InquiryForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createQnaThunk } from '../../features/qnaSlice';
import FormLayout from '../layout/FormLayout';
import Button from '../common/Button';
import Input from '../common/Input';
import FormSelect from '../common/FormSelect';
import Alert from '../common/Alert';
import './styles/InquiryForm.scss';

const INQUIRY_CATEGORIES = [
  { value: '배송', label: '배송' },
  { value: '기부', label: '기부' },
  { value: '인증/적립', label: '인증/적립' },
  { value: '주문/결제', label: '주문/결제' },
  { value: '서비스', label: '서비스' },
  { value: '기타', label: '기타' },
];

export default function InquiryForm({ variant = 'default', className = '' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.qna || {});
  const [form, setForm] = useState({
    title: '',
    category: '배송',
    content: '',
  });
  const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null });

  const showAlert = (message, variant = 'info', title = null) => {
    setAlert({ isOpen: true, message, variant, title });
  };

  const hideAlert = () => {
    setAlert({ isOpen: false, message: '', variant: 'info', title: null });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = form.title.trim();
    const question = form.content.trim();

    if (!title) {
      showAlert('제목을 입력하세요.', 'warning', '입력 오류');
      return;
    }
    if (!question) {
      showAlert('내용을 입력하세요.', 'warning', '입력 오류');
      return;
    }

    try {
      await dispatch(createQnaThunk({ title, question })).unwrap();
      showAlert('문의가 성공적으로 등록되었습니다!', 'success', '등록 완료');
      setTimeout(() => {
        navigate('/user/my');
      }, 1500);
    } catch (err) {
      console.error(err);
      showAlert(
        typeof err?.message === 'string' ? err.message : '문의 등록 실패',
        'error',
        '등록 실패'
      );
    }
  };

  const handleBack = () => navigate(-1);

  const actions = (
    <>
      <Button variant="main2" type="button" onClick={handleBack} disabled={loading}>
        돌아가기
      </Button>
      <Button variant="main1" type="submit" disabled={loading}>
        {loading ? '등록 중…' : '작성하기'}
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
      <FormLayout
        title="1:1 문의"
        variant="wide"
        className={`inquiry-form ${className}`.trim()}
        onSubmit={handleSubmit}
      >
      <div className="inquiry-form__form-header">
        <Input
          variant="default"
          type="text"
          name="title"
          placeholder="제목을 입력하세요."
          value={form.title}
          onChange={onChange}
          disabled={loading}
          className="inquiry-form__title-input"
        />
        <FormSelect
          name="category"
          value={form.category}
          onChange={onChange}
          options={INQUIRY_CATEGORIES}
          disabled={loading}
          className="inquiry-form__category-select"
        />
      </div>

      <Input
        variant="default"
        type="textarea"
        name="content"
        placeholder="내용을 입력하세요."
        rows={15}
        value={form.content}
        onChange={onChange}
        disabled={loading}
      />

      <div className="inquiry-form__actions">
        {actions}
      </div>
    </FormLayout>
    </>
  );
}

