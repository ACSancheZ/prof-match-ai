# AI Curriculum Maker

This Obsidian plugin effortlessly matches your professional experience notes with job descriptions using AI.

## Objective

The plugin gathers all job experience notes from a designated folder and uses ChatGPT to create a personalized job experience description tailored to specific job opportunities.

## Note Groups
There are three main groups of notes:
1. Job Experience: A folder containing notes for each job experience. Please include every task and responsibility you had in each job.
1. Job Opportunity Description: Add the job description to a note (preferably in a specific folder). The plugin will use this content to customize your CV, matching key points of your job experiences with the job requirements.
1. Curriculum Template: One or more files containing static CV information such as your name, mobile number, email, LinkedIn profile, etc.

## Rules
- Add your ChatGPT AppKey, which you can create on platform.openai.com.
- Name each note after the company.
- Each Job Experience note must include the following metadata:
  - started
  - ended
  - job-title
- In the template, include a placeholder {{Job-Experiences}} to indicate where the AI-generated job experiences should be placed.

## Usage
To use the plugin, open the command palette and type: **Generate Summary**.

## Example of organization
Create the following files and configure the folder path in settings.
- cv/templates/curriculum-spain.md
```md
# Antonio Sanchez dos Santos
:LiMail: acsanchez@laksdjflaa.com     :LiPhone:+34 6845642476     :LiMapPin: Valencia, Valencia 
:LiLinkedin: in/antoniocsanchez     :LiLanguages: English, Spanish and Portuguese     :LiGithub: [acsanchez](https://github.com/ACSancheZ/)

---
## Experience
{{Job-Experiences}}

---
## Certifications
#### Power Platform Fundamentals | Microsoft | 2022
- Certified in the business value and product capabilities of Microsoft Power Platform. Create simple Power Apps, connect data with Microsoft Dataverse, build a Power BI Dashboard, automate a process with Power Automate, or build a chatbot with Power Virtual Agents.
#### Azure Developer | Microsoft | 2021
- Certified in participating in all phases of development, including requirements gathering, design, development, deployment, security, maintenance, performance tuning, and monitoring.
#### Azure Fundamentals | Microsoft | 2021
- Certified in foundational knowledge of cloud services and how those services are provided with Microsoft Azure.

---
## Education
**Technical graduation in Marketing**
Fundação Escola de Comércio Alvares Penteado • São Paulo, Brazil • 1999
```

- cv/job-opportunities/job-description.md
```md
Who we are
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
Requirements:
Experience with Azure cloud platforms Architecture
Experience working in a high performance Agile/DevOps environment
Experience with infrastructure as a code provisioning tools with Terraform or
similar
Experience with configuration management and deployment tools such as
Jenkins, Azure devops.
Advanced knowledge of scripting, Git, and Git workflows.
Experience developing continuous integration and continuous delivery
(CI/CD) pipelines to automate tests and deployments.
Experience with container management software such as Docker or
Kubernetes.
Experience working with at least one of the following languages: Node.js,
Python, PHP, Ruby, .NET or Java
Experience in Scrum and Kanban
Communication skills, autonomy and teamwork.
Ability to organise, dynamism.
```
- cv/job-experience/Lorem-Ipsum-Name-Company.md
```md
---
created: 2024-05-26 00:02
started: 2011-10
ended: 2013-02
job-title: Business Analyst & Developer
tags:
---
# Projects
- Lorem Ipsum
# Responsibilities
- Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
- The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
# Achievements
- There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
# Tools
- SSIS
- SSAS
- SSRS
- C#
- SQLite
- MS SQL Server
```

- cv/job-experience/Lorem-Name-Company.md
```md
---
created: 2024-05-26 00:02
started: 2014-04
ended: 2019-09
job-title: Leader Developer
tags:
---
# Projects
- Lorem Ipsum
# Responsibilities
- Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
- The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
# Achievements
- There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
# Tools
- EDI
- C#
- MS SQL Server
```

It is possible to configure the prompt in the settings.