import { IIntroduce } from '../component/introduce/IIntroduce';
import { lastestUpdatedAt } from '../package.json';

const introduce: IIntroduce.Payload = {
  disable: false,

  contents: [
    '"측정 가능한 성과와 지속 가능한 성장을 추구하는 5년차 백엔드 개발자입니다."',
    
    '금융권 차세대 시스템부터 스타트업 MVP까지 다양한 스펙트럼의 프로젝트를 성공적으로 리딩하며, 비즈니스 임팩트를 최우선으로 하는 기술 결정을 내려왔습니다.',
    
    '창업 경험을 통해 얻은 제품 오너십과 대규모 SI 프로젝트에서 익힌 안정성을 균형있게 활용하여, 단순 기능 구현을 넘어 실제 비즈니스 문제를 해결하는 개발자입니다. 특히 레거시 시스템을 단계적으로 현대화하면서도 다운타임 제로를 유지한 경험은 저의 큰 자산입니다.',
    
    '최근에는 AI 기반 카드 추천 시스템 프로젝트를 리딩하며 AI시대에 발맞춰 나가고, 선불페이 프로젝트에 헥사고날 아키텍처 도입으로 기술부채를 50% 감소시키는 등 기술 혁신과 실무 성과를 동시에 추구하고 있습니다.',
  ],
  sign: 'LSH',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
