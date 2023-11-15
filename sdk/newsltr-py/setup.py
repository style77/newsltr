from setuptools import setup, find_packages


setup(
    name="newsltr_sdk",
    version="0.0.1",
    license="ISC",
    author="newsltr.io",
    author_email="sdk@newsltr.io",
    packages=find_packages("src"),
    package_dir={"": "src"},
    url="https://github.com/Style77/newsltr/tree/master/sdk/newsltr-py/",
    keywords="newltr sdk",
    install_requires=["httpx"],
)
