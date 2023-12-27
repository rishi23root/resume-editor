import { keyValue } from './utils';
// json template

export type BasicsT = {
  name: string;
  label: string;
  phone: string;
  image:string;
  email: string;
  url: string;
  summary: string;
  location: {
    address: string;
    postalCode: string;
    city: string;
    countryCode: string;
    region: string;
  };
  profiles: profilesT[];
};

export type profilesT ={
    network: string;
    username: string;
    url: string;
  }
export type WorkT = {
  id: string;
  name: string;
  position: string;
  url: string;
  startDate: string;
  isWorkingHere: boolean;
  endDate: string;
  summary: string;
  years: string;
};

export type EducationT = {
  id: string;
  institution: string;
  url: string;
  studyType: string;
  area: string;
  startDate: string;
  isStudyingHere: boolean;
  endDate: string;
  score: string;
};


export type ProjectsT = {
  id: string;
  name: string;
  url: string;
  languages: string;
  description: string;
};

  // "skills": [
  //   {
  //     "id": "1",
  //     "name": "HTML",
  //     "level": "Master"
  //   },

export type SkillsT = {
  id: string;
  name: string;
  level: string;
};

export type awardsT = {
  title: string;
  date: string;
  awarder: string;
  summary: string;
  url: string;
  id: string;
};

export type allArrayKeys = keyof profilesT| keyof SkillsT | keyof WorkT | keyof EducationT | keyof ProjectsT | keyof awardsT

// Record<allArrayKeys, any>
export type ArrayKeysRecord<T> = {[key in keyof T]: any}

// export type Inputs = BasicT;
export type Inputs = {
  basics:BasicsT
  // skills:BasicsT
  work:WorkT[]
};
