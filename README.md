# 🌱 My English Coach

AI 기반 영어 회화 학습 웹앱 — 나무가 자라듯 영어 실력을 성장시켜 드립니다.

## 📋 프로젝트 개요

My English Coach는 OpenAI GPT API와 Web Speech API를 활용한 단일 HTML 파일 영어 학습 웹앱입니다. 6단계 레벨 시스템으로 Pre-A1부터 C1+까지 체계적인 영어 학습을 제공합니다.

## ✅ 구현된 기능

### 🎯 핵심 시스템
- **6단계 레벨 시스템**: SEED(Pre-A1) → SPROUT(A1) → BLOOM(A2) → BRANCH(B1) → CANOPY(B2) → SKY(C1+)
- **레벨 진단 테스트**: 최초 접속 시 듣기/이해/문법/표현 8문제로 자동 레벨 배정
- **성장 나무 시각화**: 🌱→🌿→🌸→🌳→🌲→🌟 단계별 성장 시각화
- **적응형 난이도**: 정답률에 따라 콘텐츠 난이도 자동 조절
- **간격 반복 복습(SM-2)**: 틀린 문제를 자동으로 복습 큐에 추가, 홈 화면에서 복습 시작

### 📚 8가지 학습 활동
1. **Listen & Act (TPR)**: 영어 문장을 듣고 올바른 이모지/그림 선택 (Lv.0~2)
2. **Echo**: TTS 발음 듣고 자동 따라 말하기 + 음성인식 평가 (Lv.0~2, Lv.3+ AI 동적 생성)
3. **Chant**: 패턴 문장 리듬 반복 학습 (Lv.1~2)
4. **Story**: AI가 이야기를 들려주고 이해 문제 풀기 (Lv.1~2, Lv.3+ AI 동적 생성)
5. **Role Play**: AI 캐릭터와 상황별 대화 (카페, 길 찾기, 음식 주문, 병원, 호텔) (Lv.2+, Lv.3+ AI 동적 시나리오)
6. **Free Talk**: AI와 자유 대화 (Lv.2+)
7. **Mini Lesson**: CLIL 방식 주제 학습 (Science, Geography 등) (Lv.3+)
8. **Mission**: 시간제한 챌린지 (에코 스프린트, 듣기 퀴즈, 문장 만들기, 빠른 응답) (Lv.1+)

### 📖 콘텐츠 현황
| 활동 | Lv.0 | Lv.1 | Lv.2 | Lv.3~5 |
|------|------|------|------|--------|
| TPR | **55문항** | **25문항** | **25문항** | - |
| Echo | **70단어** | **50문장** | **50문장** | **AI 동적 생성** |
| Chant | - | **8패턴** | **8패턴** | - |
| Story | - | **6스토리** | **5스토리** | **AI 동적 생성** |
| Role Play | - | - | **8시나리오** | **AI 동적 생성** |
| Mission | - | 4미션 | - | - |

### 🔄 학습 완료 추적 시스템
- **todayCompleted**: 당일 완료한 콘텐츠 인덱스를 `state.todayCompleted`에 기록
- **smartSelect()**: 미완료 콘텐츠를 우선 제공하고, 모두 완료 시 기존 콘텐츠 재활용
- **markContentDone()**: TPR, Echo, 진단 세션의 각 활동 완료 시 자동 기록
- **일일 리셋**: 날짜 변경 시 `loadState()`에서 자동으로 `todayCompleted` 초기화

### 🤖 Lv.3~5 AI 동적 콘텐츠
- **Echo (Lv.3+)**: GPT가 레벨에 맞는 영어 문장 6개를 실시간 생성 (B1=일상 복합문, B2=추상적 주제, C1+=관용표현)
- **Story (Lv.3+)**: GPT가 200~600+ 단어 스토리 + 한국어 번역 + 이해 문제 3개를 동적 생성
- **Role Play (Lv.3+)**: GPT가 레벨에 맞는 시나리오 생성 (B1=일상, B2=비즈니스/여행, C1+=전문 협상)
- **로딩 UI**: AI 생성 중 ⏳ 로딩 표시, 실패 시 하드코딩 콘텐츠로 폴백

### ✏️ 실시간 문법 교정
- **checkGrammar()**: GPT 기반 문법/어휘/표현 오류 감지
- **병렬 처리**: AI 응답과 문법 체크를 Promise.all로 동시 실행 (추가 지연 없음)
- **교정 카드**: 노란색 카드로 원문(취소선) → 교정문(볼드) + 한국어 설명 표시
- **적용 위치**: Free Talk 텍스트, Free Talk Orb 음성, Voice Mode 음성 대화
- **스마트 필터**: 3단어 미만 또는 한국어 전용 입력은 건너뜀

### 🗣️ AI & 음성 기능
- **OpenAI GPT-4o-mini 연동**: 레벨별 차별화된 시스템 프롬프트
- **메아리 코칭법(Echo Coaching)**: 오류를 직접 지적하지 않고 올바른 형태로 자연스럽게 다시 말해주는 방식
- **자연스러운 대화 프롬프트**: 친구처럼 대화하는 스타일, 이모지 금지, 축약형 사용, 레벨별 단어 수 제한 (15~80단어)
- **자동 첨 인사**: 음성 대화 모드 진입 시 3가지 랜덤 인사 중 하나를 아바타가 자동 발화
- **Web Speech API TTS**: 영어 문장 자동 읽기 (속도 조절 가능, **US 영어 여성 음성 우선 선택**)
  - `getBestEnglishVoice()`: Google US Female → Google US → iOS US Female (Samantha/Ava 등) → en-US 비남성 → en-US → en-* 순서 우선 선택
  - Chrome Android `onend` 미호출 버그 대응: 안전 타임아웃 (`max(8s, 문자길이×120ms)`)
  - 빈 텍스트 가드, `speechSynthesis.resume()` 워크어라운드, 중복 resolve 방지
- **🎙️ OpenAI Whisper STT (API 키 있을 때)**: 높은 정확도의 음성 인식
  - `listenWhisper()`: MediaRecorder로 마이크 녹음 → Whisper API (`/v1/audio/transcriptions`) 전송
  - `prompt` 파라미터: Echo/Mission 활동에서 목표 문장을 힌트로 전달하여 인식률 극적 향상
  - 무음 감지 (AudioContext analyser): RMS 기반 음성/무음 판별, 1.8초 무음 시 자동 녹음 종료
  - 초기 3초간 무음이면 조기 종료 (불필요한 API 호출 방지)
  - `echoCancellation`, `noiseSuppression` 활성화, 16kHz 샘플레이트
  - `temperature: 0.0` 으로 최소 변동성 설정
  - WebM/Opus 우선, MP4 폴백 (브라우저 호환성)
  - 마이크 권한 거부/미발견 등 상세 에러 처리
- **Web Speech API STT (API 키 없을 때 폴백)**: 음성 인식 (한국어+영어 동시 인식, 자동 재시작)
  - `interimResults` 지원: `onInterim` 콜백으로 실시간 중간 결과 표시
  - 최대 4회 자동 재시작, 250ms 재시도 간격
  - `mainTimer = timeout + 500ms` 로 마지막 재시작 보호
  - 남은 시간 < 500ms 시 새 녹음 시작하지 않음
  - abort() 후 콜백 null 처리로 유령 이벤트 방지
  - 300ms TTS 정리 대기 후 STT 시작
- **통합 `listenForSpeech(lang, timeout, options)`**: Whisper/WebSpeech 자동 전환
  - `options.prompt`: Whisper에 전달할 힌트 텍스트 (Echo: 목표 단어/문장)
  - `options.onInterim`: Web Speech 폴백 시 중간 결과 콜백
  - Voice Mode/Free Talk: `onInterim`으로 실시간 음성 트랜스크립트 표시
- **한국어 입력 처리**: 한국어로 말해도 GPT가 영어로 응답하고 번역 제공
- **TTS 한글 자동 제거**: `stripKoreanForTTS()` — 화면에는 한국어 표시, TTS는 영어만 읽음
- **TTS 이모지 자동 제거**: 유니코드 이모지 범위 정규식으로 제거 (TTS가 이모지를 영어로 읽는 문제 해결)
- **한국어 번역 시각적 구분**: AI 메시지의 `(한국어)` 번역을 `<span class="ko">` 로 스타일링
  - `addChatMsg`, `addVoiceMsg`, `addRpMsg`, `addFtActMsg` 모두 XSS-safe innerHTML 사용
- **오브(Orb) 애니메이션**: 듣기(빨강), 생각(노랑), 말하기(초록) 상태 시각화
- **음성 대화 모드(Voice Orb)**: 전체 화면 보라색 그라데이션 오버레이, 자동 턴 전환
- **레벨별 프롬프트**: Lv.0은 단어+이모지+한국어, Lv.5는 자연스러운 전문 대화
- **레이스 컨디션 방지**: `toggleListening`에서 `thinking` 상태 무시, 중복 STT 방지

### 🔄 간격 반복 복습 시스템 (SM-2)
- **자동 추가**: Echo 50% 미만 단어, TPR 오답 문제 → 복습 큐 자동 등록
- **SM-2 알고리즘**: 기억 강도에 따라 복습 간격 자동 조정 (1일 → 6일 → 점차 증가)
- **홈 화면 복습 카드**: 복습할 항목 수 표시, 클릭 시 복습 세션 시작
- **복습 세션**: Echo(따라 말하기) + TPR(선택) 문제 최대 10개
- **완벽 학습 자동 졸업**: 30일 이상 간격 + Perfect 점수 시 복습 큐에서 제거

### 🎮 게이미피케이션
- **XP 시스템**: 활동 완료 시 XP 획득
- **연속 학습일(Streak)**: 매일 학습 시 🔥 카운트 증가
- **11종 배지**: 첫 학습, 연속 3/7일, XP 100/500, 레벨 달성, 에코 마스터, 수다쟁이, **꾸준한 학습자 📅**
- **일일 목표**: 50 XP 달성 목표 + 달성 시 축하 표시 및 연속 달성일 추적 (`dailyGoalStreak`)
- **일일 목표 스트릭**: 연속 달성 추적, 미달성 시 리셋, 3일 연속 시 배지 자동 획득
- **레벨업 보상 팝업**: 레벨 달성 시 축하 애니메이션

### 📊 학습 분석 대시보드
- **주간 학습 그래프**: 최근 7일 XP 막대 그래프 (CSS 기반, 오늘 `--primary` 색상 강조)
- **스킬 레이더 차트**: 5각형 SVG 차트 (듣기/말하기/어휘/문법/유창성)
  - TPR 정답 → 듣기 +2
  - Echo 80%+ → 말하기 +3 | Echo 50~79% → 말하기 +1
  - Story 퀴즈 정답 → 듣기 +2, 어휘 +1
  - Free Talk → 유창성 +2, 말하기 +1
  - MiniLesson 퀴즈 → 문법 +2, 어휘 +2
- **레벨 진행 예측**: 최근 7일 평균 일일 XP 기반 다음 레벨까지 예상 일수 표시
- **학습 알림**: 설정에서 알림 시간 설정 (`<input type="time">`), 미학습 시 노란색 배너 표시, Notification API 권한 요청

### 📍 커리큘럼 맵 (학습 로드맵)
- **세로 타임라인 UI**: Activities 탭 상단에 접이식 학습 로드맵 섹션
- **6단계 레벨 노드**: 완료(✅ 초록), 현재(인디고 펄스 애니메이션), 미래(🔒 회색)
- **레벨별 토픽 목록**: 각 레벨에 5개 학습 토픽, 클릭 시 토글 표시
- **토픽 완료 추적**: `state.completedTopics` 배열로 관리, 활동 완료 시 자동 등록
- **토픽 데이터**: Lv.0(인사/감정/색깔/동물/신체) ~ Lv.5(전문영어/뉘앙스/문화/협상/완전자유대화)
- **CSS**: `max-height` transition 접기/펼치기, 40px 원형 노드, 2px solid 타임라인 선

### 📊 대화 품질 분석 (Conversation Quality Score)
- **자동 분석**: Voice Mode 종료 시, Free Talk Activity 종료 시 GPT로 대화 전체 분석
- **6개 점수 막대 그래프**: 유창성/어휘력/문법/발음 노력/화용론/종합 (10점 만점)
  - 점수별 색상: 8+ 초록, 5-7 노랑, 1-4 빨강
- **잘한 점 / 개선할 점**: 초록/노란 배경 카드 리스트
- **교정 예시**: 원문(취소선) → 교정문(볼드) + 한국어 설명
- **XP 보너스**: overall × 5 XP 자동 지급
- **이력 저장**: `state.conversationScores[]` 에 날짜/소스/점수 저장
- **스킬 반영**: 분석 점수가 skillScores (speaking, grammar, vocabulary, fluency, listening)에 반영

### 🏅 도전 과제 시스템 (Achievement System)
- **10개 도전 과제**: 장기 동기부여 목표
  - 🗣️ 수다쟁이 (FreeTalk 10회) +50 XP
  - 📖 이야기꾼 (Story 전문 정답 5회) +50 XP
  - 🔥 불꽃 학습자 (7일 연속 스트릭) +100 XP
  - 🎯 완벽주의자 (Echo 95%+ 10회) +80 XP
  - 🌍 세계 시민 (Lv.3 도달) +100 XP
  - 🏆 마스터 (Lv.5 도달) +200 XP
  - 📝 문법왕 (문법 교정 없이 대화 5회) +60 XP
  - 🎭 배우 (RolePlay 15회) +80 XP
  - ⚡ 스피드 러너 (하루 세션 3회) +40 XP
  - 🌱 꾸준함의 힘 (총 XP 10000) +200 XP
- **자동 달성 체크**: XP 지급, 활동 완료, 스트릭 갱신 시 `checkAchievements()` 호출
- **축하 팝업**: 이모지 + 이름 + 설명 + XP 보상, CSS confetti 애니메이션 (20개 색종이)
- **Stats 페이지 섹션**: 달성 카드(날짜 표시) / 미달성 카드(프로그레스 바)
- **상태 관리**: `state.achievements{unlocked[], progress{}, dates{}}`

### 📱 UI/UX
- **모바일 퍼스트 반응형 디자인**: iOS safe area 대응
- **하단 탭 네비게이션**: 홈/활동/프리톡/학습현황
- **카드 기반 UI**: 부드러운 애니메이션, 인디고(#4F46E5) 프라이머리 컬러
- **3D 아바타 (TalkingHead)**: 음성 대화 모드에서 3D 아바타 표시
  - Ready Player Me GLB 모델 + ARKit/Oculus Visemes morph targets
  - Three.js 기반 렌더링, `cameraView: "head"`, 30 FPS
  - 아바타 로딩 진행률 표시 (0~100%)
  - 로딩 실패 시 기존 Voice Orb로 자동 폴백
  - `openVoiceMode` / `closeVoiceMode` 함수 확장 (기존 코드 미수정, 데코레이터 패턴)
  - 탭 비활성 시 자동 렌더링 중지 (메모리 절약)
  - 모바일 대응: 480px 이하에서 220×280px 축소
  - **오디오 기반 립싱크**: OpenAI TTS API → `speakAudio()` 연동
  - 단어 타임스탬프 균등 분배로 viseme 생성 → 아바타 입 모양 동기화
  - TTS API 실패 시 기존 Web Speech API `speak()`로 자동 폴백
  - **AI 감정 분석 표정**: `detectMoodFromText()` — 칭찬→happy, 공감→sad, 감탄→happy, 애정→love, 기본→neutral
  - **자동 제스처**: `triggerAvatarGesture()` — 칭찬→엄지척, 인사→손 들기, 설명→검지, 동의→OK, 모름→어깨으쓱
  - **눈맞춤 연동**: listening→`makeEyeContact(30s)`, idle→`lookAtCamera(5s)`
  - **아바타 Mood 연동**: listening→neutral, thinking→neutral, speaking→감정분석 결과, idle→neutral
  - **탭 버튼 상태 동기화**: 듣기(빨강)/생각(노랑)/말하기(초록) 애니메이션
  - **아바타 선택 기능**: 설정 모달에서 Emma(여성, nova 음성) / James(남성, onyx 음성) 선택
  - 선택한 아바타 `localStorage`에 저장, 음성 대화 모드 진입 시 자동 적용
  - 설정에서 변경 시 즉시 아바타 교체 (로딩 표시)
  - TTS 음성도 아바타에 맞게 자동 전환 (Emma=nova, James=onyx)
- **설정 모달**: API 키, TTS 속도, 자동 TTS, 한국어 번역, 수동 레벨 변경, 학습 알림 시간
- **온보딩 플로우**: 4단계 환영 화면
- **모바일 터치 최적화**: long-press 텍스트 선택 방지, touchend/click 듀얼 이벤트 리스너

### 💾 데이터 관리
- **localStorage**: 모든 학습 데이터 브라우저 저장
- **상태 필드**:
  - 기본: `level`, `xp`, `totalXp`, `streak`, `lastStudyDate`, `sessions`, `correctCount`, `totalCount`
  - 배지/활동: `badges[]`, `activityCounts{}`, `studyLog[]`
  - 일일: `dailyXp`, `dailyDate`, `dailyGoalStreak`, `_lastGoalDate`, `dailySessions`, `dailySessionDate`
  - 스킬: `skillScores{listening, speaking, vocabulary, grammar, fluency}`
  - 복습: `reviewQueue[]` (type, data, key, nextReview, interval, easeFactor)
  - 커리큘럼: `completedTopics[]` ("lv{레벨}_{토픽키}" 형식)
  - 대화 분석: `conversationScores[]` (날짜, 소스, 6개 점수, 강점/개선점)
  - 도전 과제: `achievements{unlocked[], progress{}, dates{}}`, `perfectEchoCount`, `noGrammarErrorConvCount`
  - 설정: `settings{ttsSpeed, autoTts, showKorean, reminderTime}`, `apiKey`
  - 아바타: `localStorage.selectedAvatar` (emma/james, 별도 저장)
  - 적응형: `difficultyOffset`, `consecutiveCorrect`, `consecutiveWrong`

## 🗂️ 파일 구조

```
index.html                    # 단일 HTML 파일 (HTML+CSS+JS 모두 포함, ~5479줄)
cloudflare-worker/worker.js   # Cloudflare Worker 프록시 서버 코드
README.md                     # 프로젝트 문서
```

## 🔗 진입점 및 경로

| 경로 | 설명 |
|------|------|
| `/index.html` | 메인 앱 (단일 페이지) |

### 앱 내부 화면
- **온보딩**: 최초 접속 시 4단계 소개 + API 키 입력
- **진단 테스트**: 8문제 레벨 배정
- **홈 탭**: 성장 나무, 오늘의 학습, 일일 목표 (축하/연속일 표시), 최근 활동, 복습 카드
- **활동 탭**: 8가지 학습 활동 그리드 (레벨에 따라 잠금 해제)
- **프리톡 탭**: AI 오브 텍스트/음성 대화 + 🎙️ 음성 대화 모드 (전체화면 Voice Orb 오버레이)
- **학습현황 탭**: 통계, 배지, 주간 그래프, 레이더 차트, 레벨 예측, 도전 과제, 학습 기록

## 🛠️ 기술 스택

- **HTML5/CSS3/JavaScript**: 순수 바닐라, 프레임워크 없음
- **Three.js 0.180.0**: 3D 아바타 렌더링 (CDN import map)
- **TalkingHead 1.7**: 3D 아바타 립싱크 + 표정 애니메이션 + speakAudio() 오디오 립싱크
- **OpenAI TTS API**: `tts-1` 모델, `nova` 음성 (아바타 립싱크용)
- **Google Fonts**: Noto Sans KR
- **OpenAI API**: gpt-4o-mini (사용자 API 키 또는 **Cloudflare Worker 프록시**)
- **OpenAI Whisper API**: `whisper-1` 모델 음성 인식 (프록시 또는 API 키 사용)
- **OpenAI TTS API**: `tts-1` 모델, `nova`/`onyx` 음성 (아바타 립싱크용)
- **Cloudflare Workers**: API 키 보호용 프록시 서버 (무료 티어, 선택 사항)
- **Web Speech API**: SpeechSynthesis (TTS) + SpeechRecognition (STT 폴백)
- **localStorage**: 상태/데이터 영구 저장

## 📖 사용 방법

1. 앱 접속 → 온보딩 진행
2. (선택) OpenAI API 키 입력 (AI 대화 기능 활성화)
3. 레벨 진단 테스트 진행 또는 건너뛰기
4. 홈에서 "오늘의 학습 시작" 또는 활동 탭에서 원하는 활동 선택
5. 음성 기능: 마이크 권한 허용 필요
6. 복습: 홈 화면 "📖 복습하기" 카드 클릭

## ⚠️ 참고사항

- **API 키 없이 사용 가능**: TPR, Echo, Chant, Story 등 사전 정의 콘텐츠 활동
- **API 키 또는 프록시 필요 활동**: Role Play, Free Talk, Mini Lesson (GPT 기반)
- **프록시 모드**: `PROXY_BASE_URL` 설정 시 API 키 입력 없이 모든 AI 기능 자동 활성화
- **브라우저 호환성**: Chrome/Edge 권장 (Web Speech API 지원)
- **모바일**: iOS Safari에서 음성인식이 제한적일 수 있음
- **STT 설정**: 프록시/API 키 있으면 Whisper API (고정확도), 없으면 Web Speech API 폴백
- **STT 기본 언어**: Free Talk/Voice Orb는 `ko-KR` (한국어+영어 모두 인식 가능), 학습 활동은 `en-US`

## 🚀 Cloudflare Worker 프록시 배포 가이드

API 키를 코드에 노출하지 않고 모든 AI 기능을 자동 활성화하려면 Cloudflare Worker를 사용합니다.

### 배포 순서 (10분)

1. **https://dash.cloudflare.com** 접속 → 회원가입/로그인
2. 좌측 메뉴 **"Workers & Pages"** → **"Create"** 클릭
3. **"Create Worker"** 선택 → 이름 입력 (예: `my-english-coach-api`)
4. `cloudflare-worker/worker.js` 파일 내용을 에디터에 붙여넣기 → **"Deploy"** 클릭
5. 배포 후 **"Settings"** → **"Variables and Secrets"** 이동
6. **"Add"** 클릭:
   - Variable name: `OPENAI_API_KEY`
   - Value: `sk-...` (본인의 OpenAI API 키)
   - **"Encrypt"** 체크 → Save
7. Worker URL 복사 (예: `https://my-english-coach-api.username.workers.dev`)
8. `index.html`에서 `PROXY_BASE_URL` 변수에 이 URL을 설정:
   ```javascript
   const PROXY_BASE_URL = 'https://my-english-coach-api.username.workers.dev';
   ```

### 동작 방식
```
[사용자 브라우저] → [Cloudflare Worker (API 키 보관)] → [OpenAI API]
```
- API 키는 Cloudflare 서버에만 존재 (브라우저에 노출 안 됨)
- 무료 티어: 하루 10만 요청
- GPT, Whisper STT, TTS 모든 엔드포인트 프록시 지원
- CORS 자동 처리

## 🔮 향후 개발 권장사항

1. **콘텐츠 확장**: Lv.3~5 사전 정의 콘텐츠 추가 (TPR, Echo, Story, Role Play, Mission)
2. **음성 평가 고도화**: 발음 정확도 점수 시스템 (발음 평가 API 연동)
3. **학습 경로**: 구조화된 커리큘럼 (주차별/단원별)
4. **복습 알림**: Service Worker를 활용한 예약 푸시 알림
5. **다국어 지원**: 영어 외 다른 언어 학습
6. **서버 연동**: 클라우드 데이터 동기화, 학습 분석
7. **소셜 기능**: 학습 랭킹, 친구와 대화 연습
8. **PWA**: 오프라인 지원, 앱 설치
9. **복습 통계**: 복습 성과 시각화, 기억 곡선 그래프
10. **오프라인 에러 UX**: callGPT 네트워크 실패 시 전용 배너/재시도 UI
11. **대화 분석 히스토리**: Stats 페이지에 과거 대화 분석 점수 추이 그래프
12. **도전 과제 확장**: 시즌별/이벤트 도전 과제 추가
13. **아바타 립싱크 연동**: TTS 발화 시 `talkingHead.speakText()` 연동으로 입 모양 동기화
14. **아바타 표정 연동**: 대화 상태(listening/thinking/speaking)에 따른 아바타 표정 변화
15. **아바타 커스터마이징**: Ready Player Me URL 변경으로 사용자 맞춤 아바타 지원
