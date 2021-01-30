# cd-registration

Cesko Digital Volunteer Registration Form

Slack: https://cesko-digital.slack.com/archives/C019JAJJS02

## Local Development - Gatsby

Install and run with yarn/npm

```shell
$ yarn
$ yarn start
```

Create `.env.development` file based on the `.env.example`. You need only `GATSBY_*` variables.

## Local Development - API + Gatsby

This will run the API side by side with Gatsby on localhost.

Install vercel CLI globally https://vercel.com/download.

Login to vercel and pull env variables for the project. For development you can create the project in vercel free account.

```shell
$ vercel login
$ vercel env pull
```

`.env` file should be created. For AirTable API key go to https://airtable.com/ and generate one for your account.

Run development

```shell
$ vercel dev
```
