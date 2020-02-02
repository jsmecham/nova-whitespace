//
// Whitespace Extension for Nova
// trimTrailingWhitespace.js
//
// Copyright © 2020 Justin Mecham. All rights reserved.
//

require("./Extensions/Range");

function trimTrailingWhitespace(editor) {
    const documentLength = editor.document.length;
    const documentRange = new Range(0, documentLength);
    const content = editor.getTextInRange(documentRange);
    const whitespaceExpression = /([ \t]+)$/gm;
    let removedCharacterCount = 0;

    const selectedRanges = editor.selectedRanges;

    editor.edit(function(edit) {
        let match;
        while ((match = whitespaceExpression.exec(content))) {
            const matchedWhitespace = match[1];
            const matchLength = matchedWhitespace.length;
            const startIndex = match.index - removedCharacterCount;
            const endIndex = startIndex + matchLength;
            const whitespaceRange = new Range(startIndex, endIndex);

            edit.replace(whitespaceRange, "");

            removedCharacterCount = removedCharacterCount + matchLength;

            adjustSelectedRanges(selectedRanges, whitespaceRange);
        }
    });

    // Restore Selected Ranges
    const compactedRanges = selectedRanges.filter(Boolean); // Remove NULL Ranges
    editor.selectedRanges = compactedRanges;
}

function maybeTrimTrailingWhitespace(editor) {
    const trimOnSaveEnabled = nova.config.get("Mecham.Whitespace.trimOnSave");
    if (!trimOnSaveEnabled) return;

    trimTrailingWhitespace(editor);
}

function adjustSelectedRanges(selectedRanges, removedRange) {
    selectedRanges.forEach((existingRange, index) => {
        selectedRanges[index] = adjustRange(existingRange, removedRange);
    });
}

function adjustRange(range, removedRange) {
    const rangeComparison = range.compare(removedRange);

    if (rangeComparison == 0) return;

    if (range.intersectsRange(removedRange)) {
        if (rangeComparison == -1) {
            const adjustedEnd = range.end <= removedRange.end
                ? range.end - (removedRange.length - (removedRange.end - range.end))
                : range.end - removedRange.length;
            return new Range(range.start, adjustedEnd);
        }
    } else if (rangeComparison == 1) {
        return new Range(range.start - removedRange.length, range.end - removedRange.length);
    } else if (rangeComparison == -1) {
        return range;
    }
}

module.exports = { trimTrailingWhitespace, maybeTrimTrailingWhitespace };
