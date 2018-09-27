export interface Project {
  name: string;
  imageSrc: string;
  templateSrc: string;
  link: string;
  github: string;
}

export const ProjectList: Project[] = [
  {
    name: 'JPRDY',
    imageSrc: '../assets/jprdy.jpg',
    templateSrc: '../templates/jprdy.html',
    link: 'https://www.taylordeckard.me/jprdy',
    github: 'https://github.com/taylordeckard/jeopardy',
  },
];
