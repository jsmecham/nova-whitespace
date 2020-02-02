//
// Whitespace Extension for Nova
// main.js
//
// Copyright © 2020 Justin Mecham. All rights reserved.
//

const { NPMExecutable } = require("nova-npm-executable");
const { maybeTrimTrailingWhitespace, trimTrailingWhitespace } = require("./trimTrailingWhitespace");

exports.activate = function() {

    const editorConfig = new NPMExecutable("editorconfig");
    if (!editorConfig.isInstalled) {
		editorConfig.install().catch(error => {
			console.error(error);
		});
	}

    // "Trim on Save"
    nova.subscriptions.add(
        nova.workspace.onDidAddTextEditor((editor) => {
            return editor.onWillSave(maybeTrimTrailingWhitespace);
        })
    );

};

// "Trim Trailing Whitespace" Action
nova.commands.register("whitespace.trim", trimTrailingWhitespace);
