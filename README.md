# Speed Dating

- Group 3
- DT198G

## Participants

- Alexander Berglund
  - studid:
    - albe2003
  - emails:
    - albe2003@student.miun.se
- Anton Byström
  - studid:
    - anby2001
  - emails:
    - anby2001@student.miun
    - anton_bystrom@hotmail.com
- Rama Bito
  - studid:
    - rabi2000
  - emails:
    - rabi2000@student.miun.se
- Emil Sivertsson
  - studid:
    - emsi1701
  - emails:
    - emsi1701@student.miun.se
- Sven Englsperger Raswill
  - studid:
    - sven2000
  - emails:
    - sven2000@student.miun.se
    - sven@raswill.se

\pagebreak

## Important Links

- [Jira](https://sven2000.atlassian.net/jira/software/projects/SD/boards/2)
- [Bitbucket](https://bitbucket.org/miun_dt198g/dt198g_group3_ht22/src)

## Non-code participation

### Meetings

Meetings held: 16
Meetings with product owner: 3
Total: 19

| name        | meetings   |
| ----------- | ---------- |
| albe2003    | 18         |
| anby2001    | 19         |
| rabi2000    | 13         |
| emsi1701    | 18         |
| sven2000    | 18         |

During all meetings ( notes for which one can find here: [notes](https://sven2000.atlassian.net/l/cp/Ap1abfQM) )
everyone has participated in discussions and decisions about the product, and how it will be developed.

## Code participation

### Cards

Here we can see the total number of cards that has been completed by any one person.
If a card does not have a given name, then that card is for example a discussion-card.

These cards have the status COMPLETED, and have been moved to the completed-queue. Different people
have created different number of cards. As an example a patch-card that is used to quickly fix
something that comes up during development have a very quick lifetime, and increases the number of
cards completed.

| name     | total completed cards |
| -        | :-:                   |
| albe2003 | 5                     |
| rabi2000 | 5                     |
| emsi1701 | 5                     |
| anby2001 | 22                    |
| sven2000 | 25                    |
| total    | 62                    |

#### Sprint 1

Here are the total number of cards completed by a person during sprint 1

| name     | sprint1 completed cards |
| -        | :-:                     |
| albe2003 | 2                       |
| rabi2000 | 2                       |
| emsi1701 | 2                       |
| anby2001 | 7                       |
| sven2000 | 4                       |
| total    | 17                      |

#### Sprint 2

Here are the total number of cards completed by a person during sprint 2

| name     | sprint2 completed cards |
| -        | :-:                     |
| albe2003 | 2                       |
| rabi2000 | 1                       |
| anby2001 | 12                      |
| sven2000 | 18                      |
| total    | 33                      |

### Based on Git

- No merges are counted
- Some doubles can come up, due to how git handles the usage of email
- Information taken 2023-01-05 from branch main

### Git Commits

Information taken from:
  `git shortlog -sne --no-merges`



| name          | commits |
| -             | :-:     |
| rabi2000      | 4       |
| anby2001      | 129     |
| sven2000      | 235     |
| albe2003      | 80      |
| emsi1701      | 17      |

### Git Lines

Information taken from command:
  `git log --author=<name> --no-merges --pretty=tformat: --numstat`

| name          | added | deleted | added - deleted | deleted / added |
| -             | :-:   | :-:     | :-:             | :-:             |
| albe2003      | 2437  | 1831    | 606             | 1 : 0.751334    |
| anby2001      | 1789  | 587     | 1202            | 1 : 0.328116    |
| anton_bystrom | 4145  | 2512    | 1633            | 1 : 0.606031    |
| emsi1701      | 437   | 664     | -227            | 1 : 1.51945     |
| rabi2000      | 553   | 79      | 474             | 1 : 0.142857    |
| sven2000      | 8271  | 4876    | 3395            | 1 : 0.58953     |

The reason for the strange number for emsi1701 is due to a very large removal of code of a common
component, that everyone did, but for some reason only affected emsi. We believe this is due to his
change being merged first.

\pagebreak

## Testing

### Individual Testing

During the duration of the sprints, each component has been tested by the developers, and
second-tested again by both other developers, and by people around the developers.

Each feature has been developed with the heuristics in mind, and have all been discussed in relation
to how the feature might be used by a user.

We have also tested the entire application together as a group to check for any inconsitensies, and
to ensure that the application works like we want it to. Overall we feel that we are very happy with
our results.

\pagebreak

### Pages worked on by person

This is not an exhaustive list, and overlap exists between the different pages.

#### albe2003

- Login Page
- Organiser Frontpage
- List of Events
- Backend-support for the functionality of these

#### anby2001

- Worked on the Backend
- Created the image-service
- Profile-page
- Profile editing
- Event-page
- Rating-page
- Share contact-page
- Profile-page before a meeting
- Backend-support for the functionality.
  - Created all profiles
  - Handled the database
  - Handled image-database

#### emsi1701

- Matchmaking-functionality
- Login-screen functionality
- Backend-support

#### rabi2000

- Register
- Login-support
- Organizer view of individual person

#### sven2000

- Organizer event-page
- Organizer meeting-page
- User meeting-page
- Backend-support for the functionality
- Handled the socket, with backend support for this
- Worked on the backend
- Global styling
