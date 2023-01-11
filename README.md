# Frank Energie - Github Issues Viewer Assessment

This repository contains code that implements the assignment presented by Frank Energie.

The challenge consists in implementing a Next.js app to search for a Github repository and display its basic info and issues using the Github API.

## How to install
```
git clone https://github.com/eduardovarella/frankenergie_ghissueviewer.git

cd frankenergie_ghissueviewer

nvm use v16.10

yarn install
```

## How to run the app
```
yarn run dev
```

## Implementation considerations and decisions

- GitHub API

    To prevent putting the API KEY on the client, which would be a security issue, I'm using the non-authenticated API. During tests I've reached some call limits, so it `may happen during challenge code evaluation`. In a real life scenario, the communication with GitHub API would be done through a backend where we could securily store the API Key and use the authenticatedd API.

- Error Handling

    As a matter of keeping things simple, error handling could be enhanced by better parsing axios erros responses and not using `window.alert` to display messages.

- `create-next-app` generated code clean-up

    I haven't spend too much time on cleaning-up non-used code/files generated by `create-next-app`.

- `Bonus Points` items

    Sorting: implemented
    Animations & `react-query`: not implemented due to available time

