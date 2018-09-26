export interface Project {
  name: string;
  imageSrc: string;
  templateSrc: string;
  link: string;
}

export const ProjectList: Project[] = [
  {
    name: 'JPRDY',
    imageSrc: '../assets/jprdy.jpg',
    templateSrc: '../templates/jprdy.html',
    link: 'https://www.taylordeckard.me/jprdy',
  },
];
