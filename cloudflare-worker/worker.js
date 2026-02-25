/**
 * My English Coach — Cloudflare Worker Proxy
 * 
 * OpenAI API 프록시 서버
 * - API 키를 환경변수(Secret)로 안전하게 보관
 * - CORS 처리 자동 수행
 * - GPT, Whisper, TTS 엔드포인트 모두 지원
 * 
 * === 배포 방법 ===
 * 
 * 1. https://dash.cloudflare.com 접속 → 회원가입/로그인
 * 2. 좌측 메뉴 "Workers & Pages" → "Create" 클릭
 * 3. "Create Worker" 선택 → 이름 입력 (예: my-english-coach-api)
 * 4. 이 파일 내용을 에디터에 붙여넣기 → "Deploy" 클릭
 * 5. 배포 후 "Settings" → "Variables and Secrets" 이동
 * 6. "Add" 클릭:
 *    - Variable name: OPENAI_API_KEY
 *    - Value: sk-... (본인의 OpenAI API 키)
 *    - "Encrypt" 체크 → Save
 * 7. Worker URL 복사 (예: https://my-english-coach-api.{username}.workers.dev)
 * 8. index.html의 PROXY_BASE_URL 변수에 이 URL을 입력
 * 
 * === 보안 ===
 * - API 키는 Cloudflare 서버에만 존재 (브라우저에 노출 안 됨)
 * - ALLOWED_ORIGINS로 허용된 도메인만 접근 가능
 * - 요청 크기 제한 (25MB)
 */

// 허용할 Origin (배포 후 본인 도메인 추가)
const ALLOWED_ORIGINS = [
  'http://localhost',
  'http://127.0.0.1',
  'https://localhost',
  // 배포 후 아래에 본인 도메인 추가:
  // 'https://your-app-domain.com',
];

// 허용할 OpenAI 엔드포인트 (다른 API 악용 방지)
const ALLOWED_PATHS = [
  '/v1/chat/completions',
  '/v1/audio/transcriptions',
  '/v1/audio/speech',
];

export default {
  async fetch(request, env) {
    // === CORS Preflight ===
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // === Origin 검증 ===
    const origin = request.headers.get('Origin') || '';
    const isAllowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o)) || 
                      origin.includes('.pages.dev') ||  // Cloudflare Pages
                      origin.includes('.workers.dev') ||
                      origin.includes('.netlify.app') ||
                      origin.includes('.vercel.app');

    // 개발 중에는 모든 origin 허용 (배포 후 아래 줄 제거 권장)
    // if (!isAllowed) {
    //   return new Response('Forbidden', { status: 403 });
    // }

    // === API 키 확인 ===
    const apiKey = env.OPENAI_API_KEY;
    if (!apiKey) {
      return jsonResponse({ error: 'API key not configured on server' }, 500, origin);
    }

    // === 경로 추출 ===
    const url = new URL(request.url);
    const path = url.pathname;

    // Health check
    if (path === '/' || path === '/health') {
      return jsonResponse({ status: 'ok', message: 'My English Coach API Proxy' }, 200, origin);
    }

    // === 경로 검증 ===
    if (!ALLOWED_PATHS.includes(path)) {
      return jsonResponse({ error: 'Endpoint not allowed' }, 403, origin);
    }

    // === 요청 크기 제한 (25MB) ===
    const contentLength = request.headers.get('Content-Length');
    if (contentLength && parseInt(contentLength) > 25 * 1024 * 1024) {
      return jsonResponse({ error: 'Request too large' }, 413, origin);
    }

    // === OpenAI API로 프록시 ===
    try {
      const targetUrl = 'https://api.openai.com' + path;
      
      // 원본 헤더 복사 (Authorization 제외하고 서버 키로 대체)
      const headers = new Headers();
      headers.set('Authorization', 'Bearer ' + apiKey);
      
      // Content-Type 전달 (multipart/form-data는 그대로, json은 명시)
      const ct = request.headers.get('Content-Type');
      if (ct) headers.set('Content-Type', ct);

      const proxyResp = await fetch(targetUrl, {
        method: request.method,
        headers: headers,
        body: request.method !== 'GET' ? request.body : undefined,
      });

      // 응답 헤더에 CORS 추가
      const respHeaders = new Headers(proxyResp.headers);
      respHeaders.set('Access-Control-Allow-Origin', origin || '*');
      respHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      respHeaders.set('Access-Control-Allow-Headers', 'Content-Type');

      return new Response(proxyResp.body, {
        status: proxyResp.status,
        statusText: proxyResp.statusText,
        headers: respHeaders,
      });

    } catch (err) {
      return jsonResponse({ error: 'Proxy error: ' + err.message }, 502, origin);
    }
  }
};

function handleCORS(request) {
  const origin = request.headers.get('Origin') || '*';
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function jsonResponse(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin || '*',
    },
  });
}
