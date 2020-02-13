//
// Whitespace Extension for Nova
// main.js
//
// Copyright © 2020 Justin Mecham. All rights reserved.
//

const EditorConfigService = require("./EditorConfigService");
const Whitespace = require("./Whitespace");

exports.activate = function() {

    const editorConfigService = new EditorConfigService();
    const whitespace = new Whitespace(editorConfigService);

    // "Trim on Save"
    nova.workspace.onDidAddTextEditor((editor) => {
        return editor.onWillSave(whitespace.maybeTrimTrailingWhitespace.bind(whitespace));
    })

    // "Trim Trailing Whitespace" Action
    nova.commands.register("whitespace.trim", whitespace.trimTrailingWhitespace);

};
