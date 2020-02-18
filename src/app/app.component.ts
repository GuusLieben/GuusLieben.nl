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
          frameworks: ['Spring', 'Maven/Gradle', 'Swing', 'JFX'],
          since: 2018
        },
        {
          language: 'Kotlin',
          frameworks: ['Javalin'],
          since: 2019
        },
        {
          language: 'C#',
          frameworks: ['dotNet Core', 'EF/IF', 'MVC', 'Blazor'],
          since: 2018
        },
        {
          language: 'Python',
          frameworks: ['PySerial (RPi)'],
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
        employer: 'Juwelier Stoopman B.V.',
        title: 'Sales',
        start: 'Sep. 2019',
        end: 'Present'
      },
      {
        employer: 'Plus Retail',
        title: 'Assistent store manager',
        start: 'Jun. 2018',
        end: 'Sep. 2019'
      },
      {
        employer: 'HEMA',
        title: 'Manager Bakery/Catering',
        start: 'Nov. 2016',
        end: 'Jun. 2018'
      },
      {
        employer: 'Plus Retail',
        title: 'Various departments',
        start: 'Sep. 2015',
        end: 'Nov. 2016'
      }
    ];

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

    this.http.get('https://gitlab.com/api/v4/users/guuslieben/projects').subscribe(value => {
      if (Array.isArray(value)) {
        value.forEach(repo => {
          const project = new GitProject(repo.name, repo.web_url, repo.description, 'Unknown', 'fab fa-gitlab');
          this.gitProjects.push(project);
        });
      }
    }, error => {
      console.error(error);
    });

    for (let i=0; i<10; i++) {
      this.http.get(`https://api.github.com/users/GuusLieben/events?page=${i}`).subscribe(value => {
        if (Array.isArray(value)) this.contributions += value.length;
      });
    }
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

  constructor(employer: string, title: string, start: string, end: string) {
    this.employer = employer;
    this.title = title;
    this.start = start;
    this.end = end;
  }
}
