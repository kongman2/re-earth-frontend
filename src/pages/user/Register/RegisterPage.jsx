// re-earth-frontend/src/pages/user/Register/RegisterPage.jsx
import { useState } from "react";

import {
  registerUser,
  checkUsername,
  checkNickname,
  checkEmail,
} from "../../../api/authApi";

import InputCheckPassword from "../../../components/common/InputCheckPassword";
import InputPhoneNumber from "../../../components/common/InputPhoneNumber";
import InputWithBtn from "../../../components/common/InputWithBtn";
import InputAddress from "../../../components/common/InputAddress";
import Button from "../../../components/common/Button";
import Alert from "../../../components/common/Alert";
import AuthPageLayout from "../../../components/auth/AuthPageLayout";

import { useNavigate } from "react-router-dom";

// 백엔드와 동일한 규칙
const USERID_REGEX = /^[A-Za-z0-9]{4,20}$/; // 4~20, 영문/숫자
const NICK_REGEX = /^\S{2,20}$/; // 2~20, 공백 금지
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}$/; // 영문/숫자/특수문자 각 1+ & 8+

export default function RegisterPage() {
  const [form, setForm] = useState({
    id: "", // userId (선택 → 입력 시 보존)
    nick: "", // name
    password: "",
    password2: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    email: "",
    addr1: "", // 기본/우편
    addr2: "", // 상세
  });
  const [alert, setAlert] = useState({ isOpen: false, message: '', variant: 'info', title: null });
  const navigate = useNavigate();

  const showAlert = (message, variant = 'info', title = null) => {
    setAlert({ isOpen: true, message, variant, title });
  };

  const hideAlert = () => {
    setAlert({ isOpen: false, message: '', variant: 'info', title: null });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "check-password") {
      setForm((s) => ({ ...s, password2: value }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const handleCheckId = async (e) => {
    e.preventDefault();
    const id = form.id.trim();
    if (!USERID_REGEX.test(id)) {
      showAlert("아이디는 4~20자의 영문/숫자만 가능합니다.", "warning", "입력 오류");
      return;
    }
    try {
      const { data } = await checkUsername(id);
      showAlert(
        data.available
          ? "사용 가능한 아이디입니다."
          : "이미 사용 중인 아이디입니다.",
        data.available ? "success" : "error",
        data.available ? "사용 가능" : "중복됨"
      );
    } catch (err) {
      showAlert("아이디 중복 확인 중 오류가 발생했습니다.", "error", "오류");
    }
  };

  const handleCheckNick = async (e) => {
    e.preventDefault();
    const nick = form.nick.trim();
    if (!NICK_REGEX.test(nick)) {
      showAlert("닉네임은 공백 없이 2~20자여야 합니다.", "warning", "입력 오류");
      return;
    }
    try {
      const { data } = await checkNickname(nick);
      showAlert(
        data.available
          ? "사용 가능한 닉네임입니다."
          : "이미 사용 중인 닉네임입니다.",
        data.available ? "success" : "error",
        data.available ? "사용 가능" : "중복됨"
      );
    } catch (err) {
      showAlert("닉네임 중복 확인 중 오류가 발생했습니다.", "error", "오류");
    }
  };

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    if (!email) {
      showAlert("이메일을 입력하세요.", "warning", "입력 오류");
      return;
    }
    try {
      const { data } = await checkEmail(email);
      showAlert(
        data.available
          ? "사용 가능한 이메일입니다."
          : "이미 사용 중인 이메일입니다.",
        data.available ? "success" : "error",
        data.available ? "사용 가능" : "중복됨"
      );
    } catch (err) {
      showAlert("이메일 중복 확인 중 오류가 발생했습니다.", "error", "오류");
    }
  };

  // 숫자만, 자리수 제한
  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const max = name === "phone1" ? 3 : 4; // 010-1234-5678 형태
    const onlyDigits = value.replace(/\D/g, "").slice(0, max);
    setForm((s) => ({ ...s, [name]: onlyDigits }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 규칙 / 일치 검사
    if (!PASSWORD_REGEX.test(form.password)) {
      showAlert("비밀번호는 영문/숫자/특수문자를 포함해 8자 이상이어야 합니다.", "warning", "입력 오류");
      return;
    }
    if (form.password !== form.password2) {
      showAlert("비밀번호가 일치하지 않습니다.", "error", "입력 오류");
      return;
    }

    // userId(선택) 유효성 검사
    const userId = form.id.trim();
    if (userId && !USERID_REGEX.test(userId)) {
      showAlert("아이디는 4~20자의 영문/숫자만 가능합니다.", "warning", "입력 오류");
      return;
    }

    // 주소/연락처 조합
    const address = `${form.addr1} / ${form.addr2}`.trim();
    const phoneNumber = [form.phone1, form.phone2, form.phone3]
      .filter(Boolean)
      .join("-");

    try {
      const payload = {
        ...(userId ? { userId } : {}), // 입력 시 보존, 미입력 시 서버 훅에서 자동 생성
        name: form.nick.trim(),
        email: form.email.trim().toLowerCase(),
        address,
        password: form.password,
        phoneNumber,
      };

      const res = await registerUser(payload);
      console.log("가입 결과:", res.data);

      showAlert("회원가입이 완료되었습니다!", "success", "가입 완료");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (err) {
      const msg =
        err?.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
      showAlert(msg, "error", "가입 실패");
    }
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
      <AuthPageLayout id="register" title="회원정보입력" formClassName="mt-80">
        <form onSubmit={handleSubmit}>
              {/* 아이디 */}
              <InputWithBtn
                label="아이디"
                type="text"
                name="id"
                placeholder="4-20자, 영문 대·소문자 및 숫자"
                value={form.id}
                inputChange={onChange}
                handleClick={handleCheckId}
                buttonText="중복확인"
                required={true}
              />

              {/* 닉네임 */}
              <InputWithBtn
                marginTop="mt-20"
                label="닉네임"
                type="text"
                name="nick"
                placeholder="닉네임을 입력하세요."
                value={form.nick}
                inputChange={onChange}
                buttonText="중복확인"
                handleClick={handleCheckNick}
                required={true}
              />

              {/* 비밀번호 + 확인 */}
              <InputCheckPassword
                value1={form.password}
                value2={form.password2}
                inputChange={onChange}
                marginTop="mt-20"
              />

              {/* 휴대폰번호 */}
              <InputPhoneNumber
                marginTop="mt-20"
                value1={form.phone1}
                value2={form.phone2}
                value3={form.phone3}
                inputChange={handlePhoneChange}
              />

              {/* 이메일 */}
              <InputWithBtn
                marginTop="mt-20"
                label="이메일"
                type="text"
                name="email"
                placeholder="예) example@gmail.com"
                value={form.email}
                inputChange={onChange}
                buttonText="중복확인"
                handleClick={handleCheckEmail}
                required={true}
              />

              {/* 주소 */}
              <InputAddress
                marginTop="mt-20"
                value1={form.addr1}
                value2={form.addr2}
                inputChange={onChange}
              />

        <Button variant="main1" type="submit" className="mt-40" fullWidth>
          회원가입
        </Button>
      </form>
    </AuthPageLayout>
    </>
  );
}
