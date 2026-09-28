// Single source of truth for site identity (homelab policy §4.3).
// Every template, feed, and structured-data block reads these values.

export const SITE_ORIGIN = 'https://blog.damecasol.com';
export const SITE_NAME = '3분만에 만화로 보는 IT';
export const SITE_TAGLINE = 'AI 논문·AI 뉴스·기술 해설을 만화로 3분 안에';
export const SITE_DESCRIPTION =
  'AI 논문 읽기, AI 뉴스, 기술 해설과 AI 활용을 만화와 정확한 한국어 글로 설명하는 다메카솔의 기술 블로그입니다.';
export const AUTHOR_NAME = '다메카솔';
export const AUTHOR_PATH = '/about/';
export const SITE_LOGO_PATH = '/favicon.svg';

// Social preview images. Posts get `/social/<id>.jpg` from scripts/generate-social-images.mjs;
// every other page falls back to this committed card. JPEG, not WebP: KakaoTalk, Naver, and
// some link scrapers still ignore WebP previews.
export const SOCIAL_IMAGE_WIDTH = 1280;
export const SOCIAL_IMAGE_HEIGHT = 720;
export const DEFAULT_SOCIAL_IMAGE_PATH = '/social-default.jpg';

export function socialImagePathForPost(postId: string) {
  return `/social/${postId}.jpg`;
}

// Console-issued verification tokens. They are public page metadata, not secrets.
// Google's token is already live; Naver Search Advisor issues its own once the site is
// registered there — paste it here and it renders as <meta name="naver-site-verification">.
export const GOOGLE_SITE_VERIFICATION = 'UkOytDtaiEDqpk_9kZIlE_dKnhLe0Ohbf4MBE2eYyjk';
export const NAVER_SITE_VERIFICATION = '';
