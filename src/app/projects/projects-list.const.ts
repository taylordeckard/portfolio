import { TdJprdyComponent } from '../jprdy/jprdy.component';
import { TdPasswdComponent } from '../passwd/passwd.component';

export interface Project {
  name: string;
  imageSrc: string;
  templateCmpnt: any;
  link: string;
  github: string;
}

export const ProjectList: Project[] = [
  {
    name: 'jprdy',
    imageSrc: '../assets/jprdy.jpg',
    templateCmpnt: TdJprdyComponent,
    link: 'https://www.taylordeckard.me/jprdy',
    github: 'https://github.com/taylordeckard/jeopardy',
  },
  {
    name: 'passwd',
    imageSrc: '../assets/passwd.png',
    templateCmpnt: TdPasswdComponent,
    link: 'https://www.taylordeckard.me/passwd',
    github: 'https://github.com/taylordeckard/passwd',
  },
];
