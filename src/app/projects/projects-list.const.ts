import { TdJprdyComponent } from '../jprdy/jprdy.component';

export interface Project {
  name: string;
  imageSrc: string;
  templateCmpnt: any;
  link: string;
  github: string;
}

export const ProjectList: Project[] = [
  {
    name: 'JPRDY',
    imageSrc: '../assets/jprdy.jpg',
    templateCmpnt: TdJprdyComponent,
    link: 'https://www.taylordeckard.me/jprdy',
    github: 'https://github.com/taylordeckard/jeopardy',
  },
];
