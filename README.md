# Playwright example

Example setup for the [Playwright](https://playwright.dev/) end-to-end testing
framework.

Includes an example email application with file attachment support and tests to
cover its functionality.

## Setup

Install [Node](https://nodejs.org/) project dependencies:

```sh
npm install
```

Install browser binaries:

```sh
npx playwright install
```

## Usage

Start the example server via [Docker](https://www.docker.com/):

```sh
docker-compose up -d example
```

Run the tests:

```sh
npm test
```

Run the tests in Docker:

```sh
docker-compose run --rm playwright
```

Stop the example server:

```sh
docker-compose down
```

Show traces for failed tests:

```sh
bin/show-trace.sh
```

## Webdriver

An alternative example end-to-end testing setup using the
[W3C WebDriver](https://www.w3.org/TR/webdriver/) standard can be found at
[blueimp/wdio](https://github.com/blueimp/wdio/).

## License

Released under the [MIT license](https://opensource.org/licenses/MIT).

## Author

[Sebastian Tschan](https://blueimp.net/)
