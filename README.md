<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Mainabilities][mainabilities-shield]][mainabilities-url]
<!-- [![Technical Debt][technical-debt-shield]][technical-debt-url] -->
[![API Build][api-build-shield]][api-build-url]
[![Client Build][client-build-shield]][client-build-url]


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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Newsltr Screenshot][product-screenshot]](https://github.com/style77/newsltr)

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


### Built With

* [![Next][Next.js]][Next-url]
* [![Redux][Redux]][Redux-url]
* [![Python][Python]][Python-url]
* [![Django Rest Framework][Django-Rest-Framework]][DRF-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![Redis][Redis]][Redis-url]
* [![Celery][Celery]][Celery-url]
* [![Docker][Docker]][Docker-url]
* [![Docker Compose][Docker-Compose]][Docker-Compose-url]
* [![Kubernetes][Kubernetes]][Kubernetes-url]
* [![Helm][Helm]][Helm-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an list of things you need to use the software for development purposes and how to install them.
* [Docker](https://docs.docker.com/install/)
* [Docker-compose](https://docs.docker.com/compose/install/)
* [Makefile](https://www.gnu.org/software/make/)
* [Git](https://git-scm.com/downloads)
* [Python 3](https://www.python.org/downloads/)
* [Node.js](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm)
* [Makefile](https://www.gnu.org/software/make/) (optional)


### Installation

#### Development

1. Install [Docker](https://docs.docker.com/install/) and [Docker-compose](https://docs.docker.com/compose/install/)
2. Clone repository `git clone https://github.com/style77/newsltr.git` and `cd newsltr/newsltr`
3. Run `cp .env.example .env` and fill in the environment variables
4. Go back to the root directory with `cd ..` and run `make up-dev` to start the development API environment (this will take a while)
5. Go to the `client` directory with `cd ../client` and run `npm install` to install the client dependencies and `npm run dev` to start the client

#### Production

Coming soon...

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] AI-powered content generation
- [ ] More templates
- [ ] More SDKs
    - [ ] TypeScript
    - [ ] Go

See the [open issues](https://github.com/Style77/newsltr/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. See `CONTIBUTING` for more information.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the CC BY-NC-ND License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

[Joachim Hodana](https://www.linkedin.com/in/joachim-hodana-33815b245/) ([stylek777@gmail.com](mailto:stylek777@gmail.com)) and [Mohamed Younes Abdat](https://www.linkedin.com/in/mohamed-younes-abdat-506603132)

Project Link: [https://github.com/Style77/newsltr](https://github.com/Style77/newsltr)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- Shields -->
[contributors-shield]: https://img.shields.io/github/contributors/style77/newsltr?style=for-the-badge
[contributors-url]: https://github.com/Style77/newsltr/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/style77/newsltr?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[mainabilities-shield]: https://img.shields.io/codeclimate/maintainability/Style77/newsltr?style=for-the-badge
[mainabilities-url]: https://codeclimate.com/github/Style77/newsltr
[technical-debt-shield]: https://img.shields.io/codeclimate/tech-debt/Style77/newsltr?style=for-the-badge&logoColor=red&color=red
[technical-debt-url]: https://codeclimate.com/github/Style77/newsltr
[api-build-shield]: https://img.shields.io/github/actions/workflow/status/Style77/newsltr/api.yml?label=API%20Build&style=for-the-badge
[api-build-url]: https://github.com/Style77/newsltr
[client-build-shield]: https://img.shields.io/github/actions/workflow/status/Style77/newsltr/client.yml?label=Client%20Build&style=for-the-badge
[client-build-url]: https://github.com/Style77/newsltr
<!-- Images -->
[product-screenshot]: images/screenshot.png
<!-- Made with -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Redux]: https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Python]: https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/
[Django]: https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white
[Django-url]: https://www.djangoproject.com/
[Django-Rest-Framework]: https://img.shields.io/badge/django_rest_framework-092E20?style=for-the-badge&logo=django&logoColor=white
[DRF-url]: https://www.django-rest-framework.org/
[Docker]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Docker-Compose]: https://img.shields.io/badge/docker_compose-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-Compose-url]: https://docs.docker.com/compose/
[Kubernetes]: https://img.shields.io/badge/kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white
[Kubernetes-url]: https://kubernetes.io/
[Helm]: https://img.shields.io/badge/helm-326CE5?style=for-the-badge&logo=helm&logoColor=white
[Helm-url]: https://helm.sh/
[PostgreSQL]: https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Redis]: https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
[Celery]: https://img.shields.io/badge/celery-37814A?style=for-the-badge&logo=celery&logoColor=white
[Celery-url]: https://docs.celeryproject.org/en/stable/