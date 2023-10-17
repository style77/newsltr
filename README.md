<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][https://img.shields.io/github/contributors/style77/newsltr?style=for-the-badge]][https://github.com/Style77/newsltr/graphs/contributors]
[![Stargazers][https://img.shields.io/github/stars/Style77/newsltr?style=for-the-badge]][https://github.com/othneildrew/Best-README-Template/stargazers]
[![Mainabilities][https://img.shields.io/codeclimate/maintainability/Style77/newsltr?style=for-the-badge]][]
[![Coverage][https://img.shields.io/codeclimate/coverage/Style77/newsltr?style=for-the-badge]][]
[![API Build][https://img.shields.io/github/actions/workflow/status/Style77/newsltr/api.yml?label=API%20Build&style=for-the-badge]][]
[![Client Build][https://img.shields.io/github/actions/workflow/status/Style77/newsltr/client.yml?label=Client%20Build&style=for-the-badge]][]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Style77/newsltr">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Newsltr</h3>

  <p align="center">
    Effortlessly create, manage, and send newsletters tailored to your business.
    <br />
    <a href="https://github.com/Style77/newsltr"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Style77/newsltr">View</a>
    ·
    <a href="https://github.com/Style77/newsltr/issues">Report Bug</a>
    ·
    <a href="https://github.com/Style77/newsltr/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <ul>
            <li>
                <a href="#development">Development</a>
            </li>
            <li>
                <a href="#production">Production</a>
            </li>
        </ul>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Newsltr Screenshot][images/screenshot.png]](https://github.com/style77/newsltr)

Welcome to Newsltr, the next-generation SaaS platform for effortless newsletter management. Newsltr is designed to simplify the entire process of creating, distributing, and tracking newsletters. We understand that your time is valuable, and our goal is to empower you to focus on what matters most - crafting outstanding content and engaging with your audience.

#### Why Newsltr?

- **Streamlined Newsletter Creation**: Say goodbye to the hassle of creating newsletters from scratch. Newsltr offers a wide range of professionally designed newsletter templates, making it easy to craft visually appealing content.

- **Powerful Analytics**: Gain insights into the performance of your newsletters. Track open rates, click-through rates, and audience engagement, allowing you to refine your communication strategy.

- **Flexible Workspaces**: Organize your newsletter projects efficiently using workspaces. Collaborate with team members and manage multiple newsletters seamlessly.

- **Plug-n-Play SDK**: Easily integrate Newsltr into your applications and websites with our SDK. Quickly add newsletter signup forms and enhance user engagement. Made in TypeScript (more coming soon), our SDK is designed to be developer-friendly and easy to scale for other languages.

We believe in the "Don't Repeat Yourself" (DRY) principle, not only in code but also in life. With Newsltr, you'll eliminate the repetitive tasks associated with newsletter management, ensuring your projects are always up-to-date and efficient. The best confirmation is our innovative email templates system that allows you to create and manage your own templates. You can also use our pre-built templates to get started quickly. **We are also planning to add AI-powered content generation in the future.**

**Our Commitment to Improvement**: We understand that every project is unique, and your needs may evolve. That's why we are committed to continuously enhancing Newsltr. Expect more features and templates in the near future. Your feedback is invaluable, and you're welcome to contribute by forking this repository, creating pull requests, or opening issues.

Thank you to all the contributors who have played a part in expanding this platform. Together, we're making newsletter management easier and more effective.

Ready to get started? Visit our [website](https://github.com/Style77/newsltr) to explore Newsltr, and let's transform the way you manage newsletters!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Development

### Requirements

- [Docker](https://docs.docker.com/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)
- [Makefile](https://www.gnu.org/software/make/)
- [Git](https://git-scm.com/downloads)
- [Python 3](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)


### Setup

1. Install [Docker](https://docs.docker.com/install/) and [Docker-compose](https://docs.docker.com/compose/install/)
2. Clone repository `git clone https://github.com/style77/newsltr.git` and `cd newsltr/newsltr`
3. Run `cp .env.example .env` and fill in the environment variables
4. Go back to the root directory with `cd ..` and run `make up-dev` to start the development API environment (this will take a while)
5. Go to the `client` directory with `cd ../client` and run `npm install` to install the client dependencies and `npm run dev` to start the client