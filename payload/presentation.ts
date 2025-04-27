import { IPresentation } from '../component/presentation/IPresentation';

const presentation: IPresentation.Payload = {
  disable: false,

  list: [
    {
      title: 'CKAD',
      subTitle: 'Certified Kubernetes Application Developer',
      at: '2024-05',
      descriptions: [
        {
          content: 'Linux Foundation',
        },
      ],
    },
    {
      title: 'SAA',
      subTitle: 'AWS Certified Solutions Architect - Associate',
      at: '2023-10',
      descriptions: [
        {
          content: 'AWS',
        },
      ],
    },
    {
      title: '빅데이터분석기사',
      subTitle: 'Big Data Analytics Engineer',
      at: '2022-12',
      descriptions: [
        {
          content: '한국데이터산업진흥원',
        },
      ],
    },
    {
      title: '정보처리기사',
      subTitle: 'Engineer Information Processing',
      at: '2019-12',
      descriptions: [
        {
          content: '한국산업인력공단',
        },
      ],
    },
    {
      title: 'SQLD',
      subTitle: 'SQL Developer',
      at: '2021-12',
      descriptions: [
        {
          content: '한국데이터산업진흥원',
        },
      ],
    },
    {
      title: 'DAsP',
      subTitle: '데이터아키텍처 준전문가',
      at: '2022-04',
      descriptions: [
        {
          content: '한국데이터산업진흥원',
        },
      ],
    },
    {
      title: 'ADsP',
      subTitle: '데이터 분석 준전문가',
      at: '2022-03',
      descriptions: [
        {
          content: '한국데이터산업진흥원',
        },
      ],
    },
    {
      title: '네트워크관리사 2급',
      subTitle: 'Network Advisor 2nd Grade',
      at: '2019-07',
      descriptions: [
        {
          content: '한국정보통신자격협회',
        },
      ],
    },
  ],
};

export default presentation;
