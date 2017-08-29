# spectacle-editor-viewer

A component for viewing a [Spectacle Editor][] presentation.

## Development

### Code Quality

```sh
$ npm run lint
```

### Run demo

You can run a live demo of the component with test data:

```sh
$ npm start
$ open localhost:3000
```

To test different decks, replace the `demo/test.json` file.

## Release

### Versioning should adhere to [semver][] principles.

```sh
# Checkout master and check code quality
$ git checkout master
$ npm run lint

# Build lib/
$ npm run build

# Increase version according to Semver
$ npm version major|minor|patch

# Commit and release
$ git push origin master
$ npm publish
```

[semver]: http://semver.org/
[Spectacle Editor]: https://github.com/FormidableLabs/spectacle-editor
