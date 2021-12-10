const currentAge = '27';
const education = [
  {
    title: 'Odessa National College of Arts and Culture',
    degree: 'Junior Specialist in Musical Arts (Drums & Percussion)',
    period: 'September 2012 - July 2016',
  },
];
const experience = [
  {
    company: 'Phoenix Reisen Bonn, Germany',
    title: 'Showband Musician (Drums)',
    period: 'June 2018 - September 2018',
    list: [
      'Playing production shows',
      'Playing dance sets',
      'Playing shows with guest entertainers',
      'Taking part in drills and trainings',
    ],
  },
  {
    company: 'SevenSeas Productions, Belgium',
    title: 'Showband Musician (Drums)',
    period: 'April 2019 - September 2019',
    list: [
      'Playing production shows',
      'Playing dance sets',
      'Playing shows with guest entertainers',
      'Taking part in drills and trainings',
    ],
  },
  {
    company: 'P&O Australia',
    title: 'Showband Musician (Drums)',
    period: 'January 2020 - May 2020',
    list: [
      'Playing production shows',
      'Playing dance sets',
      'Playing shows with guest entertainers',
      'Taking part in drills and trainings',
    ],
  },
  {
    company: 'Periodix.NET, (USA/Poland)',
    title: 'Lead Generation Specialist',
    period: 'July 2020 - March 2021',
    list: [
      'Writing cover letters',
      'Manage Statistical Documentation',
      'Compose Cover Letter Templates',
    ],
  },
  {
    company: 'Periodix.NET, (USA/Poland)',
    title: 'Junior Front-End Developer',
    period: 'March 2021 - Today',
    list: [
      'Develop new UI components',
      'Maintain and scale existing UI',
      'Develop and maintain NLP API (Python/Node)',
      'Set up CI/CD for development purposes',
      'Maintain backend code parts on Node.js',
    ],
  },
];
const skills = {
  musical: [
    {
      title: 'Sight-Reading',
      level: 60,
    },
    {
      title: 'Sound Production',
      level: 60,
    },
    {
      title: 'Composition & Arrangement',
      level: 75,
    },
    {
      title: 'Keys',
      level: 60,
    },
    {
      title: 'Guitar/Bass',
      level: 65,
    },
    {
      title: 'Drums & Percussion',
      level: 95,
    },
  ],
  development: [
    {
      title: 'Python',
      level: 10,
    },
    {
      title: 'MobX',
      level: 40,
    },
    {
      title: 'Redux Saga',
      level: 30,
    },
    {
      title: 'Git/GitHub/GitLab',
      level: 50,
    },
    {
      title: 'HTML/CSS/SASS',
      level: 50,
    },
    {
      title: 'AWS',
      level: 20,
    },
    {
      title: 'Heroku',
      level: 30,
    },
    {
      title: 'Firebase',
      level: 30,
    },
    {
      title: 'jQuery',
      level: 50,
    },
    {
      title: 'Webpack',
      level: 50,
    },
    {
      title: 'MongoDB',
      level: 40,
    },
    {
      title: 'Node.js',
      level: 45,
    },
    {
      title: 'Redux',
      level: 50,
    },
    {
      title: 'React',
      level: 65,
    },
    {
      title: 'TypeScript',
      level: 50,
    },
    {
      title: 'JavaScript',
      level: 70,
    },
  ],
  languages: [
    {
      title: 'German',
      level: 15,
    },
    {
      title: 'Dutch',
      level: 15,
    },
    {
      title: 'French',
      level: 15,
    },
    {
      title: 'English',
      level: 80,
    },
    {
      title: 'Russian',
      level: 100,
    },
    {
      title: 'Ukrainian',
      level: 100,
    },
  ],
};

document
  .querySelectorAll('[data-type="age"]')
  .forEach((node) => (node.textContent = currentAge + ' years old'));

displayEducation(education);
displayExperience(experience);
displaySkills(skills);

function displayEducation(arrayOfObjects) {
  const target = document.getElementById('edu');
  let length = arrayOfObjects.length;

  while (length--) {
    const block = document.createElement('div');
    const title = document.createElement('h2');
    const degree = document.createElement('h4');
    const period = document.createElement('span');

    block.className = 'edu-block';
    title.className = 'edu-title';
    degree.className = 'edu-degree';
    period.className = 'edu-period';

    title.textContent = arrayOfObjects[length].title;
    degree.textContent = arrayOfObjects[length].degree;
    period.textContent = arrayOfObjects[length].period;

    block.append(title, degree, period);
    target.append(block);
  }
}
function displayExperience(arrayOfObjects) {
  const target = document.getElementById('exp');
  let length = arrayOfObjects.length;

  while (length--) {
    const { company, title, period, list } = arrayOfObjects[length];
    const block = document.createElement('div');
    const template = `
<span class="exp-company">${company}</span>
<h4 class="exp-title">${title}</h4>
<span class="exp-period">${period}</span>
<ul class="exp-list">${list.map((item) => `<li>${item}</li>`).join('')}</ul>
`;
    block.className = 'exp-block';
    block.innerHTML = template;
    target.append(block);
  }
}
function displaySkills(object) {
  for (const key in object) {
    const array = object[key];
    const target = document.getElementById(key);

    let length = array.length;

    while (length--) {
      const { title, level } = array[length];
      const block = document.createElement('div');
      const template = `
<h6 class="skill-title">${title}</h6>
<div class="skill-level-row">
  <span class="skill-level-label">Basic</span>
  <progress value="${level}" max="100" class="skill-level"></progress>
  <span class="skill-level-label">Expert</span>
</div>
`;

      block.className = 'skill-block';
      block.innerHTML = template;
      target.append(block);
    }
  }
}
