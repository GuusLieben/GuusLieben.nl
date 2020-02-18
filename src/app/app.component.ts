import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';

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

  constructor(private http: HttpClient) {
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
          since: 2020
        }
      ]
    },
      {
        title: 'Functional programming',
        skills: [
          {
            language: 'Rust',
            frameworks: ['Rocket'],
            since: 2020
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
  }

  join(arr: string[]): string {
    return arr.join(', ');
  }

  years(since: number) {
    const years = moment().year() - since;
    return years < 1 ? '< 1' : years;
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
