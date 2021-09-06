import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {range} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Guus Lieben';
  gitProjects: Array<GitProject> = [];
  skillSets: Array<SkillSet> = [];
  work: Array<Work> = [];
  certificates: Array<Certificate>
  contributions: number = 0;

  private themes = {
    selected: 'dark',
    dark: {
      bg: 'hsl(240, 10%, 10%)',
      'bg-light': 'hsl(240, 9%, 15%)',
      high: 'hsla(315, 29%, 46%, 0.4)',
      'high-light': 'hsla(315, 29%, 46%, 0.9)',
      imp: 'hsla(202, 55%, 79%, 0.4)',
      'imp-light': 'hsla(204, 29%, 55%, 0.87)',
      text: 'hsl(0, 0%, 80%)',
      'text-mid': 'hsl(0, 0%, 71%)',
      'text-light': 'hsl(30, 5%, 15%)'
    },
    light : {
      bg: 'hsl(0, 0%, 100%)',
      'bg-light': 'hsl(0, 0%, 97%)',
      high: 'hsla(54, 100%, 62%, 0.4)',
      'high-light': 'hsla(54, 100%, 62%, 0.9)',
      imp: 'hsla(197, 100%, 83%, 0.4)',
      'imp-light': 'hsla(194, 88%, 37%, 0.87)',
      text: 'hsl(0, 0%, 25%)',
      'text-mid': 'hsl(0, 0%, 50%)',
      'text-light': 'hsl(0, 0%, 97%)'
    }
  };

  constructor(private http: HttpClient) {
    this.switchTheme('dark');
  }

  ngOnInit(): void {
    this.skillSets = [{
      title: 'Web Programming',
      skills: [
        {
          language: 'TypeScript',
          frameworks: ['Angular', 'React', 'Vue'],
          since: 2018
        },
        {
          language: 'JavaScript',
          frameworks: ['jQuery', 'Node.js', 'Express'],
          since: 2014
        },
        {
          language: 'HTML, CSS',
          frameworks: ['Sass/SCSS', 'Less', 'Jade', 'Pug'],
          since: 2013
        }
      ]
    }, {
      title: 'Object Oriented Programming (OOP)',
      skills: [
        {
          language: 'Java',
          frameworks: ['Spring(Boot)', 'Maven/Gradle', 'Swing', 'JavaFX', 'Vaadin', 'Android'],
          since: 2018
        },
        {
          language: 'Kotlin',
          frameworks: ['Javalin'],
          since: 2019
        },
        {
          language: 'C#',
          frameworks: ['.NET Core', 'Entity Framework', 'Blazor', 'Identity Framework'],
          since: 2018
        },
        {
          language: 'Python',
          frameworks: ['PySerial (RPi)', 'OpenCV', 'NumPy', 'TensorFlow'],
          since: 1
        }
      ]
    },
      {
        title: 'Functional programming',
        skills: [
          {
            language: 'Rust',
            frameworks: ['Rocket'],
            since: 1
          }
        ]
      },
      {
        title: '*NIX Administration',
        skills: [
          {
            language: 'Bash Scripting',
            frameworks: ['UNIX/BSD'],
            since: 2016
          },
          {
            language: 'System Administration',
            frameworks: ['Debian/Fedora (Based)'],
            since: 2014
          }
        ]
      },
      {
        title: 'Databases',
        skills: [
          {
            language: 'SQL',
            frameworks: ['Microsoft SQL Server / Analysis Services', 'MySQL'],
            since: 2018
          },
          {
            language: 'NoSQL',
            frameworks: ['MongoDB', 'Neo4J', 'Google Firestore'],
            since: 2019
          }
        ]
      }];

    this.work = [
      {
        employer: 'Cost Engineering',
        title: 'Software Engineer',
        start: 'Jan. 2021',
        end: 'Present',
        short: [
            'Developed a new primary web- and browser integration framework for existing SaaS solutions.'
        ]
      },
      {
        employer: 'Cost Engineering',
        title: 'Software Engineering Intern',
        start: 'Jul. 2020',
        end: 'Jan. 2021',
        short: [
            'Performed a exhaustive research regarding the digital representation of physical and functional characteristics of 3D spaces.',
            'Developed a proof-of-concept application showcasing the ability to connect informational models to digital cost estimations.'
        ]
      },
      {
        employer: 'Avans University',
        title: 'Peer Mentor',
        start: 'Feb. 2019',
        end: 'Jun. 2021',
        short: [
            'Mentored first-, second-, and third year computer science students, providing support to plan and execute projects and individual assignments.'
        ]
      },
      {
        employer: 'Juwelier Stoopman B.V.',
        title: 'Sales',
        start: 'Sep. 2019',
        end: 'Sep. 2021',
        short: [
            'Provided consultations to customers regarding purchases and repairs.',
            'Performed in-store repairs on (wrist)watches.',
            'Served as communication point between the store and CRM software suppliers.'
        ]
      },
      {
        employer: 'Plus Retail',
        title: 'Assistent store manager',
        start: 'Jun. 2018',
        end: 'Sep. 2019',
        short: [
            'Lead over seventy people across five departments, supporting several department managers.',
            'Managed in- and outbound customer and enterprise deliveries.',
            'Actively performed store evaluations to enhance work performance.'
        ]
      },
      {
        employer: 'HEMA',
        title: 'Manager Bakery/Catering',
        start: 'Nov. 2016',
        end: 'Jun. 2018',
        short: [
            'Managed the bakery and catering departments, coordinating people across both departments.'
        ]
      },
      {
        employer: 'Plus Retail',
        title: 'Various departments',
        start: 'Sep. 2015',
        end: 'Nov. 2016'
      }
    ];

    this.certificates = [
      {
        title: "Undergraduate Computer Science",
        awarded: "2020",
        license: "Propaedeutic diploma",
        awardedBy: "the Avans University, Breda"
      },
      {
        title: "Cambridge First Certificate in English",
        awarded: "2015",
        license: "Level B2",
        awardedBy: "the Cambridge English Language Assessment"
      },
      {
        title: "G Data | Avans University Hack Session",
        awarded: "2019",
        license: "License 3513230715",
        awardedBy: "G Data Software & Avans University"
      },
      {
        title: "Lean IT",
        awarded: "2020",
        license: "Online Certificate",
        awardedBy: "LinkedIn Learning"
      }
    ]

    // GitHub API
    this.http.get('https://api.github.com/users/GuusLieben/repos').subscribe(value => {
      if (Array.isArray(value)) {
        value.forEach(repo => {
          const project = new GitProject(repo.name, repo.html_url, repo.description, repo.language, 'fab fa-github');
          this.gitProjects.push(project);
        });
      }
    }, error => {
      console.error(error);
    });
  }

  join(arr: string[]): string {
    return arr.join(', ');
  }

  since(since: number): string {
    const years = this.years(since);
    return years > 1 ? `${years} years` : `${years} year`
  }

  years(since: number) {
    if (since < moment().year() - 2000) return since;
    const years = moment().year() - since;
    return years < 1 ? '< 1' : years;
  }

  toggleColor() {
    if (this.themes.selected === 'dark') this.switchTheme('light')
    else this.switchTheme('dark')
  }

  switchTheme(id: string) {
    Object.keys(this.themes[id]).forEach(reg => document.documentElement.style.setProperty(`--c-${reg}`, this.themes[id][reg]))
    this.themes.selected = id;
  }
}

class SkillSet {

  title: string;
  skills: Array<Skill> = [];

  constructor(title: string, skills: Array<Skill>) {
    this.title = title;
    this.skills = skills;
  }
}

class Certificate {

  title: string;
  awarded: string;
  license: string;
  awardedBy: string;

  constructor(title: string, awarded: string, license: string, awardedBy: string) {
    this.title = title;
    this.awarded = awarded;
    this.license = license;
    this.awardedBy = awardedBy;
  }
}

class Skill {

  language: string;

  frameworks: string[] = [];
  since: number;

  constructor(language: string, frameworks: string[], since: number) {
    this.language = language;
    this.frameworks = frameworks;
    this.since = since;
  }
}

class GitProject {

  source: string;
  title: string;
  url: string;
  description: string;
  language: string;

  constructor(title: string, url: string, description: string, language: string, source: string) {
    this.title = title;
    this.url = url;
    this.description = description;
    this.language = language;
    this.source = source;
  }
}

class Work {

  employer: string;
  title: string;
  start: string;
  end: string;
  short?: string[];

  constructor(employer: string, title: string, start: string, end: string) {
    this.employer = employer;
    this.title = title;
    this.start = start;
    this.end = end;
  }
}
