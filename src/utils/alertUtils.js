// alertUtils.js
// alert() 함수를 Alert 컴포넌트로 쉽게 사용할 수 있는 유틸리티

/**
 * Alert를 모달로 표시하는 헬퍼 함수
 * @param {string} message - 알림 메시지
 * @param {string} variant - 알림 타입: 'success' | 'error' | 'warning' | 'info'
 * @param {string} title - 알림 제목 (선택)
 * @returns {Promise} - 닫힐 때 resolve되는 Promise
 */
export const showAlert = (message, variant = 'info', title = null) => {
  return new Promise((resolve) => {
    // React 컴포넌트를 직접 호출할 수 없으므로,
    // 이 함수는 Alert 컴포넌트를 사용하는 컴포넌트에서 호출해야 합니다.
    // 대신 이벤트를 발생시켜서 전역 상태로 관리하거나,
    // 각 컴포넌트에서 useState로 관리하는 것을 권장합니다.
    
    // 임시로 네이티브 alert 사용 (나중에 교체)
    window.alert(message)
    resolve()
  })
}

/**
 * Alert 컴포넌트를 사용하기 위한 React Hook
 * 컴포넌트에서 이 hook을 사용하여 Alert를 쉽게 표시할 수 있습니다.
 */
export const useAlert = () => {
  const [alertState, setAlertState] = React.useState({
    isOpen: false,
    message: '',
    variant: 'info',
    title: null,
  })

  const showAlert = (message, variant = 'info', title = null) => {
    setAlertState({
      isOpen: true,
      message,
      variant,
      title,
    })
  }

  const hideAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }))
  }

  return {
    alertState,
    showAlert,
    hideAlert,
  }
}

