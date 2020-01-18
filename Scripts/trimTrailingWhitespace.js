//
// Whitespace Extension for Nova
// trimTrailingWhitespace.js
//
// Copyright © 2020 Justin Mecham. All rights reserved.
//

function trimTrailingWhitespace(editor) {
    const documentLength = editor.document.length;
    const documentRange = new Range(0, documentLength);
    const content = editor.getTextInRange(documentRange);
    const whitespaceExpression = /([ \t]+)$/gm;
    let removedCharacterCount = 0;

    editor.edit(function(edit) {
        let match;
        while (match = whitespaceExpression.exec(content)) {
            const matchedWhitespace = match[1];
            const matchLength = matchedWhitespace.length;
            const startIndex = match.index - removedCharacterCount;
            const endIndex = startIndex + matchLength;
            const whitespaceRange = new Range(startIndex, endIndex);

            edit.replace(whitespaceRange, "");

            removedCharacterCount = removedCharacterCount + matchLength;
        }
    });
}

function maybeTrimTrailingWhitespace(editor) {
    const trimOnSaveEnabled = nova.config.get("Mecham.Whitespace.trimOnSave");
    if (!trimOnSaveEnabled) return;

    trimTrailingWhitespace(editor);
}

module.exports = { trimTrailingWhitespace, maybeTrimTrailingWhitespace };
