# ChangeLog

## Version 1.3.1

- Removed custom Range.length extension to fix a conflict with the new built-in
  implementation.

## Version 1.3.0

- Added support for the `trim_trailing_whitespace` EditorConfig setting.
- Restructured the project to allow for npm dependencies to be consumed.
- Made improvements to the README.
- Simplified the formatting of the CHANGELOG.

## Version 1.2.0

- Selection ranges and cursor positions are now maintained after trimming
  whitespace.
- Added to the "formatters" category in the Nova extensions registry.
- Added ESLint configuration to the project.

## Version 1.1.1

- Fixed package archive for publishing to Nova's extensions server.

## Version 1.1.0

- Added support for automatically trimming whitespace on save (default: `true`).
- Added additional metadata to the Nova extension manifest.

## Version 1.0.0

- Initial release.
