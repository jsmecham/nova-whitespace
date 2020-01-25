//
// Whitespace Extension for Nova
// main.js
//
// Copyright © 2020 Justin Mecham. All rights reserved.
//

const { maybeTrimTrailingWhitespace, trimTrailingWhitespace } = require("trimTrailingWhitespace");

exports.activate = function() {

    // "Trim on Save"
    nova.subscriptions.add(
        nova.workspace.onDidAddTextEditor(editor => editor.onWillSave(maybeTrimTrailingWhitespace))
    );

};

// "Trim Trailing Whitespace" Action
nova.commands.register("whitespace.trim", trimTrailingWhitespace);
