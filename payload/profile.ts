import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { IProfile } from '../component/profile/IProfile';
import image from '../asset/profile.png';

const profile: IProfile.Payload = {
  disable: false,

  // image: 'https://resume.yowu.dev/static/image/profile_2019.png',
  image,
  name: {
    title: '이 승현(Lee Seung-Hyun)',
    small: '(36)',
  },
  contact: [
    {
      title: 'gmavsks@gmail.com',
      link: 'mailto:gmavsks@gmail.com',
      icon: faEnvelope,
    },
    {
      title: 'Please contact me by email',
      icon: faPhone,
      badge: true,
    },
    {
      link: 'https://github.com/gitvssh',
      icon: faGithub,
    },
    {
      link: 'https://damecasol.tistory.com/',
      icon: faFacebook,
    },
  ],
  notice: {
    title: '백엔드 개발자 이승현의 온라인 이력서입니다.',
    icon: faBell,
  },
};

export default profile;
