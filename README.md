# X Blocker

Safari extension for macOS that blocks `x.com` and replaces it with a local blocking screen.

## Project Layout

- `web-extension/` contains the raw Safari Web Extension source.
- `XBlocker/` contains the generated macOS app wrapper and Safari extension project.

## Open In Xcode

From the repository root, open `XBlocker/XBlocker.xcodeproj`.

## Build From Terminal

```sh
xcodebuild -project XBlocker/XBlocker.xcodeproj \
  -scheme XBlocker \
  -configuration Debug \
  -derivedDataPath build \
  CODE_SIGNING_ALLOWED=NO \
  build
```

The built app will be at:

`build/Build/Products/Debug/XBlocker.app`

## Enable The Extension

1. Launch `XBlocker.app`.
2. Click `Open Safari Settings`.
3. In Safari, open `Extensions`.
4. Enable `X Blocker`.

After that, visiting `https://x.com` will immediately show the blocker screen.
