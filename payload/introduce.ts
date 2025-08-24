import { IIntroduce } from '../component/introduce/IIntroduce';
import { lastestUpdatedAt } from '../package.json';

const introduce: IIntroduce.Payload = {
  disable: false,

  contents: [
    '5년차 백엔드 개발자로서 시스템 안정성과 비즈니스 가치 창출에 집중합니다.',

    '금융 SI/SM과 스타트업 환경에서 쌓은 경험을 바탕으로, 기술적 문제 해결과 개발 프로세스 혁신을 주도해왔습니다. 정기적인 컨퍼런스 참여와 기술 트렌드 분석을 통해 조직에 필요한 신기술을 선제적으로 도입하며, 단순 코드 구현을 넘어 기술부채 해소와 측정 가능한 성과를 만들어내는 것이 저의 강점입니다.',
  ],
  sign: 'LSH',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
