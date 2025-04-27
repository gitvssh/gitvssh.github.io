import { IEducation } from '../component/education/IEducation';

const education: IEducation.Payload = {
  disable: false,

  list: [
    {
      title: '한국방송통신대학교',
      subTitle: '통계데이터과학과(학사)',
      startedAt: '2020-03',
      endedAt: '2022-08',
    },
    {
      title: '국가평생교육진흥원',
      subTitle: '컴퓨터공학과(학사)',
      startedAt: '2018-03',
      endedAt: '2020-02',
    },
    {
      title: '국립목포해양대학교',
      subTitle: '해양정보통신공학과(중퇴)',
      startedAt: '2010-03',
      endedAt: '2013-02',
    },
    {
      title: '대성고등학교',
      subTitle: '졸업',
      startedAt: '2004-03',
      endedAt: '2007-02',
    },
  ],
};

export default education;
