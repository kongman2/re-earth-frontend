// re-earth-frontend/src/hooks/landing/useEarthAnimation.js
import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

// 유틸리티 함수들
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth = (t) => t * t * (3 - 2 * t);
const easeOut = (t) => 1 - Math.pow(1 - t, 2.2);
const lerp = (a, b, t) => a + (b - a) * t;

// 설정값들
const SCROLL_EXP = 2.6;
const STAGEB_EASE_EXP = 1.2;
const S1 = 0.860, S2 = 0.975, S3 = 1.000;
const ALPHA_FWD = 0.055, STEP_FWD = 0.010;
const ALPHA_REV = ALPHA_FWD, STEP_REV = STEP_FWD;
const GRAD_FADE_END = 0.70, RING_IN_DELAY = 0.20, RING_IN_POWER = 1.8, RING_B_FADE_QUICK = 0.1;
const ORBIT_SLOW_S = 42, MAX_ORBIT_SCALE = 1.3, RECT_AR = 16/9;
const FINISH_GAP_PX = 72, REVEAL_AFTER_PX = 12, REENTER_HYSTERESIS_PX = 140;

const useEarthAnimation = () => {
  const scrollerRef = useRef(null);
  const introRef = useRef(null);
  const panelFullRef = useRef(null);
  const wrapElRef = useRef(null);
  const appRef = useRef(null);
  const titleElRef = useRef(null);
  const svgOrbitRef = useRef(null);
  const gScaleRef = useRef(null);
  const gRotateRef = useRef(null);
  const pathElRef = useRef(null);
  const tpathElRef = useRef(null);
  const earthRef = useRef(null);
  const mapRef = useRef(null);
  const cloudsRef = useRef(null);
  const faceRef = useRef(null);
  const eye1Ref = useRef(null);
  const eye2Ref = useRef(null);
  const mouthRef = useRef(null);

  const stateRef = useRef({
    baseSize: null,
    rotationStarted: false,
    pTarget: 0,
    pSmooth: 0,
    ticking: false,
    fullTop: 1,
    animEndY: 1,
    finished: false,
    revealed: false,
    lastY: 0,
    scrollDir: 1
  });

  const setRootVar = useCallback((name, val) => {
    document.documentElement.style.setProperty(name, val);
  }, []);

  const getCSSNumber = useCallback((name, fallback = 1) => {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  }, []);

  const updateRootSizeFromWrapper = useCallback(() => {
    if (!wrapElRef.current) return;
    const w = wrapElRef.current.getBoundingClientRect().width || 500;
    setRootVar('--s', String(Math.round(w)));
  }, [setRootVar]);

  const getRectCover = useCallback((vw, vh, ar = RECT_AR) => {
    const byWidth = { W: vw, H: vw / ar };
    const byHeight = { W: vh * ar, H: vh };
    return (byWidth.H >= vh) ? byWidth : byHeight;
  }, []);

  const recalcBoundaries = useCallback(() => {
    const fullTop = panelFullRef.current?.offsetTop || 1;
    const animEndY = Math.max(1, fullTop - FINISH_GAP_PX);
    stateRef.current.fullTop = fullTop;
    stateRef.current.animEndY = animEndY;
  }, []);

  const lockSnap = useCallback((lock) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.classList.toggle('no-snap', !!lock);
  }, []);

  const updateOrbitLayout = useCallback(() => {
    if (!svgOrbitRef.current || !gScaleRef.current || !pathElRef.current || !tpathElRef.current || !wrapElRef.current || !earthRef.current) return;
    
    const wrapW = wrapElRef.current.getBoundingClientRect().width || 1;
    const earthW = earthRef.current.getBoundingClientRect().width || wrapW;
    const growth = earthW / wrapW;
    const baseScale = getCSSNumber('--orbitScale', 1.08);
    const candidate = baseScale * growth;
    const scale = Math.min(candidate, MAX_ORBIT_SCALE);
    
    gScaleRef.current.style.transform = `scale(${scale})`;
    const baseLen = pathElRef.current.getTotalLength();
    const circLen = baseLen * scale;
    const textEl = svgOrbitRef.current.querySelector('.orbit-text');
    if (!textEl) return;
    
    textEl.style.fontSize = '';
    tpathElRef.current.removeAttribute('textLength');
    tpathElRef.current.setAttribute('lengthAdjust', 'spacing');
    tpathElRef.current.setAttribute('startOffset', '1%');
    
    let naturalLen = textEl.getComputedTextLength();
    const TARGET_MARGIN = 0.90;
    const fitLen = circLen * TARGET_MARGIN;
    
    if (naturalLen > fitLen) {
      const currentPx = parseFloat(getComputedStyle(textEl).fontSize) || 16;
      const shrink = fitLen / naturalLen;
      textEl.style.fontSize = (currentPx * shrink).toFixed(2) + 'px';
      naturalLen = textEl.getComputedTextLength();
    }
    
    const TIGHTEN = 0.985;
    const targetLen = Math.max(naturalLen, fitLen) * TIGHTEN;
    tpathElRef.current.setAttribute('textLength', targetLen.toFixed(2));
  }, [getCSSNumber]);

  const startOrbitRotation = useCallback((secondsPerRev = 20) => {
    if (!gRotateRef.current || stateRef.current.rotationStarted) return;
    stateRef.current.rotationStarted = true;
    gsap.to(gRotateRef.current, {
      rotation: 360,
      svgOrigin: "50 50",
      ease: "none",
      duration: secondsPerRev,
      repeat: -1
    });
  }, []);

  const setFace = useCallback((mode) => {
    [eye1Ref.current, eye2Ref.current].forEach(eye => {
      if (eye) eye.className = 'earth__eye';
    });
    if (faceRef.current) faceRef.current.className = 'earth__face';
    if (mouthRef.current) mouthRef.current.className = 'earth__mouth';
    
    if (mode === 'blink') {
      [eye1Ref.current, eye2Ref.current].forEach(eye => {
        if (eye) eye.classList.add('earth__eye--blinking');
      });
    } else if (mode === 'strain') {
      [eye1Ref.current, eye2Ref.current].forEach(eye => {
        if (eye) eye.classList.add('earth__eye--straining');
      });
      if (faceRef.current) faceRef.current.classList.add('earth__face--straining');
      if (mouthRef.current) mouthRef.current.classList.add('earth__mouth--straining');
    } else if (mode === 'spin') {
      [eye1Ref.current, eye2Ref.current].forEach(eye => {
        if (eye) eye.classList.add('earth__eye--spinning');
      });
      if (mouthRef.current) mouthRef.current.classList.add('earth__mouth--extended');
    }
  }, []);

  const setFaceByProgress = useCallback((t) => {
    if (t < 0.33) setFace('blink');
    else if (t < 0.7) setFace('strain');
    else setFace('spin');
  }, [setFace]);

  const updateFaceFixedScale = useCallback((currentW, currentH) => {
    if (!stateRef.current.baseSize) return;
    const baseMin = Math.min(stateRef.current.baseSize.w0, stateRef.current.baseSize.h0);
    const curMin = Math.max(1, Math.min(currentW, currentH));
    let scale = baseMin / curMin;
    scale = Math.max(0.4, Math.min(scale, 3));
    if (faceRef.current) {
      faceRef.current.style.setProperty('--faceScale', String(scale));
    }
  }, []);

  const getRawProgress = useCallback(() => {
    if (!scrollerRef.current) return 0;
    let y = scrollerRef.current.scrollTop || 0;
    if (!stateRef.current.finished && y > stateRef.current.animEndY) {
      scrollerRef.current.scrollTop = stateRef.current.animEndY;
      y = stateRef.current.animEndY;
    }
    const p = clamp01(y / stateRef.current.animEndY);
    return Math.pow(p, SCROLL_EXP);
  }, []);

  const updateBackgroundByProgress = useCallback((p) => {
    const t = clamp01(p / GRAD_FADE_END);
    const alpha = 1 - easeOut(t);
    setRootVar('--gradAlpha', alpha.toFixed(4));
  }, [setRootVar]);

  const applyStages = useCallback((p) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // baseSize가 없으면 현재 크기를 사용하고, 리사이즈 시 업데이트
    let w0 = stateRef.current.baseSize?.w0;
    let h0 = stateRef.current.baseSize?.h0;
    
    if (!w0 || !h0) {
      // CSS 변수로 설정된 크기를 읽어서 사용
      if (wrapElRef.current) {
        const computedStyle = getComputedStyle(wrapElRef.current);
        const minWidth = parseFloat(computedStyle.getPropertyValue('--wrap-min')) || 360;
        const fluidWidth = computedStyle.getPropertyValue('--wrap-fluid') || '86vmin';
        const maxWidth = parseFloat(computedStyle.getPropertyValue('--wrap-max')) || 1100;
        
        // clamp 계산을 시뮬레이션
        const vmin = Math.min(vw, vh);
        const fluidValue = parseFloat(fluidWidth) || 86;
        const calculatedWidth = Math.max(minWidth, Math.min(vmin * (fluidValue / 100), maxWidth));
        
        w0 = calculatedWidth;
        h0 = calculatedWidth; // aspect-ratio 1:1
        stateRef.current.baseSize = { w0, h0 };
      } else {
        w0 = w0 || 500;
        h0 = h0 || 500;
      }
    }

    updateBackgroundByProgress(p);

    if (p <= S1 + 1e-6) {
      const t = smooth(p / S1);
      if (titleElRef.current) titleElRef.current.style.opacity = (1 - t).toFixed(4);
      if (wrapElRef.current) {
        wrapElRef.current.style.top = `${lerp(100, 50, t)}%`;
        const w = w0, h = h0;
        wrapElRef.current.style.width = `${w}px`;
        wrapElRef.current.style.height = `${h}px`;
      }
      if (svgOrbitRef.current) {
        const tt = clamp01((t - RING_IN_DELAY) / (1 - RING_IN_DELAY));
        const ringIn = Math.pow(tt, RING_IN_POWER);
        svgOrbitRef.current.style.opacity = ringIn.toFixed(4);
        if (ringIn > 0.02) startOrbitRotation(ORBIT_SLOW_S);
      }
      updateRootSizeFromWrapper();
      updateOrbitLayout();
      updateFaceFixedScale(w0, h0);
      setFaceByProgress(0.4 * t);
      if (earthRef.current) {
        gsap.set(earthRef.current, { rotation: 0, skewX: 0, opacity: 1 });
      }
      return;
    }

    if (p <= S2 + 1e-6) {
      const norm = clamp01((p - S1) / (S2 - S1));
      const t = smooth(Math.pow(norm, STAGEB_EASE_EXP));
      if (titleElRef.current) titleElRef.current.style.opacity = 0;
      const rect = getRectCover(vw, vh);
      const w = lerp(w0, rect.W, t);
      const h = lerp(h0, rect.H, t);
      if (wrapElRef.current) {
        wrapElRef.current.style.top = '50%';
        wrapElRef.current.style.width = `${w}px`;
        wrapElRef.current.style.height = `${h}px`;
      }
      if (earthRef.current) {
        earthRef.current.style.borderRadius = `${50 * (1 - t)}%`;
      }
      if (svgOrbitRef.current) {
        const fadeQuick = clamp01(t / RING_B_FADE_QUICK);
        svgOrbitRef.current.style.opacity = (1 - fadeQuick).toFixed(4);
      }
      updateRootSizeFromWrapper();
      updateOrbitLayout();
      updateFaceFixedScale(w, h);
      setFaceByProgress(t);
      const amp = 5 * Math.sin(Math.PI * t);
      const rot = amp * Math.sin(2 * Math.PI * 5 * t);
      if (earthRef.current) {
        gsap.set(earthRef.current, { rotation: rot, skewX: rot * 0.4, opacity: 1 });
      }
      return;
    }

    const rect = getRectCover(vw, vh);
    const t = smooth((p - S2) / (S3 - S2));
    const side0 = Math.min(rect.W, rect.H);
    const m1 = clamp01(t / 0.55);
    const W1 = lerp(rect.W, side0, m1);
    const H1 = lerp(rect.H, side0, m1);
    const br = (50 * m1) + '%';
    const m2 = clamp01((t - 0.55) / 0.45);
    const W = lerp(W1, 0, m2);
    const H = lerp(H1, 0, m2);
    const op = 1 - m2;

    if (wrapElRef.current) {
      wrapElRef.current.style.top = '50%';
      wrapElRef.current.style.width = `${W}px`;
      wrapElRef.current.style.height = `${H}px`;
    }
    if (earthRef.current) {
      earthRef.current.style.borderRadius = br;
    }

    updateRootSizeFromWrapper();
    updateOrbitLayout();
    updateFaceFixedScale(W, H);

    const amp = 5 * (1 - t);
    const rot = amp * Math.sin(2 * Math.PI * 3 * (1 - t));
    if (earthRef.current) {
      gsap.set(earthRef.current, { rotation: rot, skewX: rot * 0.4, opacity: op });
    }

    if (svgOrbitRef.current) svgOrbitRef.current.style.opacity = 0;
    if (wrapElRef.current) {
      wrapElRef.current.style.pointerEvents = (t > 0.98) ? 'none' : 'auto';
    }

    if (!stateRef.current.finished && t >= 0.9995 && W <= 1 && H <= 1 && op <= 0.01) {
      stateRef.current.finished = true;
      document.body.classList.add('earth-done');
      lockSnap(true);
    }
  }, [updateBackgroundByProgress, updateRootSizeFromWrapper, updateOrbitLayout, updateFaceFixedScale, setFaceByProgress, startOrbitRotation, getRectCover, lockSnap]);

  const tick = useCallback(() => {
    const alpha = (stateRef.current.scrollDir === -1) ? ALPHA_REV : ALPHA_FWD;
    const maxStep = (stateRef.current.scrollDir === -1) ? STEP_REV : STEP_FWD;
    let step = (stateRef.current.pTarget - stateRef.current.pSmooth) * alpha;
    if (step > maxStep) step = maxStep;
    if (step < -maxStep) step = -maxStep;
    if (Math.abs(stateRef.current.pTarget - stateRef.current.pSmooth) < 0.0006) {
      stateRef.current.pSmooth = stateRef.current.pTarget;
    } else {
      stateRef.current.pSmooth += step;
    }
    applyStages(stateRef.current.pSmooth);
    if (Math.abs(stateRef.current.pTarget - stateRef.current.pSmooth) > 0.0006) {
      requestAnimationFrame(tick);
    } else {
      stateRef.current.ticking = false;
    }
  }, [applyStages]);

  const requestTick = useCallback(() => {
    if (!stateRef.current.ticking) {
      stateRef.current.ticking = true;
      requestAnimationFrame(tick);
    }
  }, [tick]);

  const onScroll = useCallback(() => {
    if (!scrollerRef.current) return;
    
    const y = scrollerRef.current.scrollTop || 0;
    stateRef.current.scrollDir = (y > stateRef.current.lastY) ? 1 : (y < stateRef.current.lastY ? -1 : stateRef.current.scrollDir);
    stateRef.current.lastY = y;

    stateRef.current.pTarget = getRawProgress();
    requestTick();

    if (stateRef.current.finished && y < stateRef.current.animEndY - REENTER_HYSTERESIS_PX) {
      stateRef.current.finished = false;
      stateRef.current.revealed = false; // revealed 상태도 리셋
      document.body.classList.remove('earth-done');
      document.body.classList.remove('earth-revealed');
      lockSnap(true);
      stateRef.current.pSmooth = Math.min(stateRef.current.pSmooth, S2);
      stateRef.current.pTarget = Math.min(getRawProgress(), S2);
      requestTick();
    }

    // 지구 애니메이션이 완료되고 아래로 내려갈 때 스크롤 스냅 다시 활성화
    if (stateRef.current.finished && !stateRef.current.revealed && y >= (stateRef.current.fullTop + REVEAL_AFTER_PX)) {
      stateRef.current.revealed = true;
      document.body.classList.add('earth-revealed');
      lockSnap(false);
    }
    
    // 지구 애니메이션이 완료되지 않았거나 위로 올라갔을 때는 스크롤 스냅 활성화
    if (!stateRef.current.finished && scrollerRef.current.classList.contains('no-snap')) {
      lockSnap(false);
    }
  }, [getRawProgress, requestTick, lockSnap]);

  const onResize = useCallback(() => {
    // 모바일에서도 반응형 처리
    if (!wrapElRef.current) return;
    
    // CSS 변수로 설정된 크기를 다시 계산
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const computedStyle = getComputedStyle(wrapElRef.current);
    const minWidth = parseFloat(computedStyle.getPropertyValue('--wrap-min')) || 360;
    const fluidWidth = computedStyle.getPropertyValue('--wrap-fluid') || '86vmin';
    const maxWidth = parseFloat(computedStyle.getPropertyValue('--wrap-max')) || 1100;
    
    // clamp 계산
    const vmin = Math.min(vw, vh);
    const fluidMatch = fluidWidth.match(/(\d+(?:\.\d+)?)vmin/);
    const fluidValue = fluidMatch ? parseFloat(fluidMatch[1]) : 86;
    const calculatedWidth = Math.max(minWidth, Math.min(vmin * (fluidValue / 100), maxWidth));
    const calculatedHeight = calculatedWidth; // aspect-ratio 1:1
    
    // baseSize 업데이트
    stateRef.current.baseSize = { w0: calculatedWidth, h0: calculatedHeight };
    
    // 현재 애니메이션 진행 중이면 크기 즉시 업데이트
    if (wrapElRef.current && stateRef.current.pSmooth < S1) {
      wrapElRef.current.style.width = calculatedWidth + 'px';
      wrapElRef.current.style.height = calculatedHeight + 'px';
    }

    updateRootSizeFromWrapper();
    updateOrbitLayout();
    recalcBoundaries();
    if (!stateRef.current.finished && scrollerRef.current && scrollerRef.current.scrollTop > stateRef.current.animEndY) {
      scrollerRef.current.scrollTop = stateRef.current.animEndY;
    }
    stateRef.current.pTarget = getRawProgress();
    if (Math.abs(stateRef.current.pTarget - stateRef.current.pSmooth) > 0.2) {
      stateRef.current.pSmooth = stateRef.current.pTarget;
    }
    requestTick();
  }, [updateRootSizeFromWrapper, updateOrbitLayout, recalcBoundaries, getRawProgress, requestTick]);

  const setupLanding = useCallback(() => {
    if (!wrapElRef.current) return;
    
    // CSS 변수로 설정된 크기를 계산
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const computedStyle = getComputedStyle(wrapElRef.current);
    const minWidth = parseFloat(computedStyle.getPropertyValue('--wrap-min')) || 360;
    const fluidWidth = computedStyle.getPropertyValue('--wrap-fluid') || '86vmin';
    const maxWidth = parseFloat(computedStyle.getPropertyValue('--wrap-max')) || 1100;
    
    // clamp 계산: min(vmin * fluid%, max) 형태
    const vmin = Math.min(vw, vh);
    const fluidMatch = fluidWidth.match(/(\d+(?:\.\d+)?)vmin/);
    const fluidValue = fluidMatch ? parseFloat(fluidMatch[1]) : 86;
    const calculatedWidth = Math.max(minWidth, Math.min(vmin * (fluidValue / 100), maxWidth));
    const calculatedHeight = calculatedWidth; // aspect-ratio 1:1
    
    wrapElRef.current.style.position = 'fixed';
    wrapElRef.current.style.left = '50%';
    wrapElRef.current.style.top = '100%';
    wrapElRef.current.style.transform = 'translate(-50%, -50%)';
    wrapElRef.current.style.width = calculatedWidth + 'px';
    wrapElRef.current.style.height = calculatedHeight + 'px';
    wrapElRef.current.style.zIndex = '6';
    
    stateRef.current.baseSize = { w0: calculatedWidth, h0: calculatedHeight };
    
    // CSS 변수 업데이트
    updateRootSizeFromWrapper();
    
    if (svgOrbitRef.current) svgOrbitRef.current.style.opacity = 0;
    if (titleElRef.current) titleElRef.current.style.opacity = 1;
    if (earthRef.current) {
      earthRef.current.style.width = '100%';
      earthRef.current.style.height = '100%';
      earthRef.current.style.borderRadius = '50%';
      gsap.set(earthRef.current, { rotation: 0, skewX: 0, opacity: 1 });
    }
    if (faceRef.current) {
      faceRef.current.style.setProperty('--faceScale', '1');
    }
    setFace('blink');
    updateOrbitLayout();
    setRootVar('--gradAlpha', '1');
  }, [updateRootSizeFromWrapper, setFace, updateOrbitLayout, setRootVar]);

  useEffect(() => {
    const initAnimation = () => {
      scrollerRef.current = document.querySelector('.snap');
      introRef.current = document.querySelector('.panel.panel--intro');
      panelFullRef.current = document.getElementById('panel-full');
      
      if (introRef.current) {
        wrapElRef.current = introRef.current.querySelector('.earth-wrap');
        appRef.current = introRef.current.querySelector('#app');
        titleElRef.current = introRef.current.querySelector('.hero-title');

        const svgOrbit = introRef.current.querySelector('.earth-orbit');
        if (svgOrbit) {
          svgOrbitRef.current = svgOrbit;
          gScaleRef.current = svgOrbit.querySelector('.orbit-scale');
          gRotateRef.current = svgOrbit.querySelector('.orbit-rotator');
          pathElRef.current = svgOrbit.querySelector('#txt-path');
          tpathElRef.current = svgOrbit.querySelector('textPath');
        }
      }

      if (!wrapElRef.current || !appRef.current) {
        console.error('[init] .earth-wrap or #app not found');
        return;
      }

      lockSnap(true);
      document.body.classList.remove('earth-done');

      setupLanding();
      recalcBoundaries();

      if (scrollerRef.current) {
        scrollerRef.current.addEventListener('scroll', onScroll, { passive: true });
      }
      window.addEventListener('resize', onResize);

      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
      if (scrollerRef.current) {
        scrollerRef.current.scrollTop = 0;
      }

      stateRef.current.pTarget = getRawProgress();
      stateRef.current.pSmooth = stateRef.current.pTarget;
      applyStages(stateRef.current.pSmooth);
      requestTick();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAnimation);
    } else {
      initAnimation();
    }

    return () => {
      if (scrollerRef.current) {
        scrollerRef.current.removeEventListener('scroll', onScroll);
      }
      window.removeEventListener('resize', onResize);
    };
  }, [lockSnap, setupLanding, recalcBoundaries, onScroll, onResize, getRawProgress, applyStages, requestTick]);

  return {
    earthRef,
    mapRef,
    cloudsRef,
    faceRef,
    eye1Ref,
    eye2Ref,
    mouthRef
  };
};

export default useEarthAnimation;