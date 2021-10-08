# Mega.nz Desktop Application

> A [Mega.nz](https://mega.nz) Electron Desktop app for managing files on 
> Windows, macOS and Linux.

![MEGAdesktop][screenshot]

## Build

You can run and build the app with the following:

```bash
# Start the development app
yarn start

# Make the binaries
yarn make

# Package the binaries for distribution
yarn package
```

## Testing

ESlint is integrated into this package and will lint and fix files according to 
code standards defined in the `.eslintrc.js` configuration:

```bash
yarn lint
```

There is also a command for testing which is non-functional as I haven't 
implemented this yet.

```bash
yarn test
```

## Releases

There is a Gruntfile which handles version bumps, the creation of changelogs and
the git workflow of commit, tag and push.

```bash
# Increment version number by 0.0.1, create changelog, tag & publish to GitHub.
grunt

# Increment version number by 0.0.1 and create changelog.
grunt bump-changelog

# Commit, tag and publish to GitHub.
grunt publish

# Increment version number by 0.1.0, create changelog and publish to GitHub.
grunt minor

# Increment version number by 1.0.0, create changelog and publish to GitHub.
grunt major
```

## License

> Copyright (c) 2021 Justin Hartman <code@justinhartman.co> (https://justinhartman.co)

The software is released under the MIT license. See the [LICENSE](LICENSE) file 
for more.

## Credits

- [MEGA Icon][icon-src] made by [Freepik][freepik] from [www.flaticon.com][flaticon]

[screenshot]: /docs/images/app.png "MEGAdesktop App"
[freepik]: https://www.freepik.com "Freepik"
[flaticon]: https://www.flaticon.com "Flaticon"
[icon-src]: https://www.flaticon.com/free-icon/mega_873133