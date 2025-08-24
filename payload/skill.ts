import { ISkill } from '../component/skill/ISkill';

const programmingLanguages: ISkill.Skill = {
  category: 'Programming Languages',
  items: [
    {
      title: 'Java',
    },
    {
      title: 'JavaScript',
    },
    {
      title: 'Python',
    },
  ],
};
const backendDevelopment: ISkill.Skill = {
  category: 'Backend Development',
  items: [
    { title: 'Spring Boot' },
    { title: 'Spring Security' },
    { title: 'Spring Batch' },
    { title: 'JPA' },
    { title: 'QueryDSL' },
  ],
};

const database: ISkill.Skill = {
  category: 'Database',
  items: [{ title: 'MySQL' }, { title: 'PostgreSQL' }],
};

const devOps: ISkill.Skill = {
  category: 'DevOps / Infrastructure',
  items: [
    { title: 'Docker' },
    { title: 'Kubernetes' },
    { title: 'AWS' },
    { title: 'Linux' },
    { title: 'Vault' },
    { title: 'Jenkins' },
    { title: 'Git' },
    { title: 'Kafka' },
  ],
};

const skill: ISkill.Payload = {
  disable: false,
  skills: [programmingLanguages, backendDevelopment, database, devOps],
};

export default skill;
