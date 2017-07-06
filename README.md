[![Build Status](https://travis-ci.org/joefraley/humane-society-api.svg?branch=master)](https://travis-ci.org/joefraley/humane-society-api) [![codecov](https://codecov.io/gh/joefraley/humane-society-api/branch/master/graph/badge.svg)](https://codecov.io/gh/joefraley/humane-society-api)
 [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)


# Oregon Humane Society API

[![Greenkeeper badge](https://badges.greenkeeper.io/joefraley/humane-society-api.svg)](https://greenkeeper.io/)
A GraphQL API for data about animals sheltered at the Oregon Humane Society.

## Running
For now it's impossible to run this project locally (you would need the Firebase credentials to access any data). I am currently transitioning to Neo4j (a native graph database management solution), at which point it will be much easier to provision access/provide test scripts without needing a Firebase account.

## Roadmap
See [issues](github.com:joefraley/humane-society-api/issues) for an idea of current progress and features.  

## FAQ
> 1. Where do you get the data?  

I scrape the Oregon Human Society's website using [this thing I wrote](https://github.com/joefraley/humane-society-scraper).  

> 2. Won't they be mad?  

Nah, they'll be fine. For now my scrape has a very low impact on their page hits. I currently only scrape occasionally for test data.  

> 3. Cool tests broh!  

This project has convinced me that _for API development_ a small number of representative integration tests are more informative, more maintainable, and generally more helpful than a huge pile of discrete unit tests. Happy to hear the other side.  

> 4. Why Babel?  

There are three proposed features I want access to:

  1. The `async/await` keywords
  2. SystemJS modules (the `import/export` keywords)
  3. The object spread syntax (or "object splat"). With GraphQL in particular the splat is super useful.

I could do without the first two but not the last. As long as I have to compile for object splat anyway, the other two are fun and handy.

> 5. Why GraphQL?  

REST API's suffer whenever you need access to arbitrary pieces of data that bear arbitrary relationships. My experience has been that this is hugely common in web development. I don't want to make a request for users, see what comes back, and then make a different request to a different endpoint for each user's blog posts. 

That's very frustrating. It's also very expensive and slow. GraphQL makes it possible to define the relationships between entitities (like users and blog posts) at the API layer. This allows clients to only ask for what they need without requiring they understand the inner workings of the API. This is easier to understand and write, in many cases more performant, and by far more maintainable thanks to better separation of concerns.
