import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormLayout from "../../../../components/layout/FormLayout";
import Input from "../../../../components/common/Input";
import InputCheckPassword from "../../../../components/common/InputCheckPassword";
import Button from "../../../../components/common/Button";
import Modal from "../../../../components/common/Modal";
import Alert from "../../../../components/common/Alert";
import { logoutUserThunk, userUpdateThunk } from "../../../../features/authSlice";
import "./ProfileEditPage.scss";

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = location.state || {};
  const [formData, setFormData] = useState(user);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [phoneData, setPhoneData] = useState({
    phone1: formData?.phoneNumber?.split("-")[0],
    phone2: formData?.phoneNumber?.split("-")[1],
    phone3: formData?.phoneNumber?.split("-")[2],
  });
  const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null });

  const showAlert = (message, variant = 'info', title = null) => {
    setAlert({ isOpen: true, message, variant, title });
  };

  const hideAlert = () => {
    setAlert({ isOpen: false, message: '', variant: 'info', title: null });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setPhoneData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit 전 데이터 확인:", formData);
    dispatch(userUpdateThunk(formData)).then(() => {
      showAlert("정보가 성공적으로 수정되었습니다.", "success", "수정 완료");
      setTimeout(() => {
        navigate("/user/my");
      }, 1500);
    });
    console.log("프로필 수정:", formData);
  };

  const handlePasswordSubmit = () => {
    console.log("비밀번호 변경:", passwordData);
    if (passwordData.newPassword != passwordData.confirmPassword) {
      showAlert("비밀번호가 일치하지 않습니다.", "error", "오류");
      return;
    }
    setShowChangePasswordModal(false);
    setPasswordData({
      newPassword: "",
      confirmPassword: "",
    });
    setFormData((prev) => ({
      ...prev,
      newPassword: passwordData.newPassword,
    }));
  };

  // 중복 확인 핸들러들
  const handleNameCheck = () => {
    console.log("이름 중복 확인:", formData.name);
    // 중복 확인 로직
  };

  const handleNicknameCheck = () => {
    console.log("닉네임 중복 확인:", formData.nickname);
    // 중복 확인 로직
  };

  const handleEmailCheck = () => {
    console.log("이메일 중복 확인:", formData.email);
    // 중복 확인 로직
  };

  const handleAddressSearch = () => {
    console.log("주소 검색");
    // 주소 검색 로직
  };

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
      <div className="user-page bg-sub-m profile-edit">
        <div className="container">
        <div className="row">
          {/* 좌측 사이드바 */}
          <div className="col-lg-3 col-md-4 col-12 mb-md-0 mb-3 profile-edit__sidebar">
            <div className="profile-edit__avatar-section">
              <div className="profile-edit__avatar">
                <img
                  src="/src/assets/icons/profile.png"
                  alt="프로필"
                  className="img-fluid profile"
                />
              </div>
              <Button variant="main3" className="profile-edit__photo-btn w-100">
                프로필 사진 변경
              </Button>
              <Button
                variant="default"
                className="profile-edit__password-btn w-100"
                onClick={() => setShowChangePasswordModal(true)}
              >
                비밀번호 변경
              </Button>
              <Button variant="default" className="w-100">회원탈퇴</Button>
            </div>
          </div>

          {/* 우측 메인 영역 */}
          <div className="col-lg-9 col-md-8 col-12 profile-edit__main">
            <FormLayout
              variant="wide"
              title="내 정보 수정"
              className="profile-edit__form-layout"
              onSubmit={handleSubmit}
            >
              {/* 이름 */}
              <Input
                variant="withButton"
                label="이름"
                type="text"
                name="name"
                value={formData?.name}
                placeholder=""
                onChange={handleInputChange}
                required={true}
                variantProps={{
                  buttonText: "중복 확인",
                  onButtonClick: handleNameCheck,
                }}
              />

              {/* 휴대폰번호 */}
              <Input
                variant="phone"
                onChange={handlePhoneChange}
                variantProps={{
                  phone1: phoneData?.phone1,
                  phone2: phoneData?.phone2,
                  phone3: phoneData?.phone3,
                }}
              />

              {/* 이메일 */}
              <Input
                variant="withButton"
                label="이메일"
                type="email"
                name="email"
                value={formData?.email}
                placeholder=""
                onChange={handleInputChange}
                required={true}
                variantProps={{
                  buttonText: "중복 확인",
                  onButtonClick: handleEmailCheck,
                }}
              />

              {/* 주소 */}
              <Input
                variant="address"
                onChange={handleInputChange}
                required={true}
                variantProps={{
                  address1: formData?.address?.split("/")[0],
                  address2: formData?.address?.split("/")[1],
                  onAddressSearch: handleAddressSearch,
                }}
              />

              {/* 저장 버튼 */}
              <div className="profile-edit__actions">
                <Button
                  variant="main1"
                  type="submit"
                  className="w-100"
                >
                  저장하기
                </Button>
              </div>
            </FormLayout>
          </div>
        </div>
      </div>

      {/* 비밀번호 확인 모달 */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="비밀번호 확인이 필요합니다."
        size="sm"
        footer={
          <Button variant="main1" onClick={() => setShowPasswordModal(false)}>
            입력
          </Button>
        }
      >
        <Input
          variant="default"
          type="password"
          name="currentPassword"
          value={passwordData?.currentPassword || ''}
          placeholder="비밀번호를 입력하세요."
          onChange={handlePasswordChange}
        />
      </Modal>

      {/* 비밀번호 변경 모달 */}
      <Modal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        title="비밀번호 변경"
        size="sm"
        footer={
          <Button variant="main1" onClick={handlePasswordSubmit}>
            입력
          </Button>
        }
      >
        <div className="password-change-form">
          <InputCheckPassword
            showChangePasswordModal={showChangePasswordModal}
            value1={passwordData?.newPassword}
            value2={passwordData?.confirmPassword}
            inputChange={handlePasswordChange}
          />
        </div>
      </Modal>
    </div>
    </>
  );
};

export default ProfileEditPage;
