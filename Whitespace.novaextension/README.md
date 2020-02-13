# Whitespace Extension for Nova

Provides the missing support in Nova for trimming trailing whitespace from
files, both automatically (as a preference) and on demand (as a command).

## Features

* Automatically trims trailing whitespace from files on save (as a preference,
  which is enabled by default).
* Honors the `trim_trailing_whitespace` preference from [EditorConfig](https://editorconfig.org),
  if you are using it in your environment.
* Provides a **Trim Trailing Whitespace** command in the Command Palette
  (**⇧⌘P**) that will remove trailing whitespace from the currently focused
  editor.
