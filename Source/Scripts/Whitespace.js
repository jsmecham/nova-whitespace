//
// Whitespace Extension for Nova
// Whitespace.js
//
// Copyright © 2020 Justin Mecham. All rights reserved.
//

const { NPMExecutable } = require("nova-npm-executable");
const { trimTrailingWhitespace } = require("./trimTrailingWhitespace");

class Whitespace {

    constructor(editorConfigService = null) {
        this.editorConfigService = editorConfigService;
    }

    get isTrimOnSavePreferenceEnabled() {
        return nova.config.get("Mecham.Whitespace.trimOnSave");
    }

    async isTrimOnSaveEnabledForDocument(document) {
        const documentSettings = await this.editorConfigService.settingsForDocument(document);
        return ["true", "unset", undefined].includes(documentSettings["trim_trailing_whitespace"]);
    }

    trimTrailingWhitespace(editor) {
        return trimTrailingWhitespace(editor);
    }

    async maybeTrimTrailingWhitespace(editor) {
        if (!this.isTrimOnSavePreferenceEnabled) return;
        if (!(await this.isTrimOnSaveEnabledForDocument(editor.document))) return;

        return trimTrailingWhitespace(editor);
    }

}

module.exports = Whitespace;

