// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function notNoInit (element : string, index : number, array : string[]) {
	return (element !== '-no-init');
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('The "rocq-bindings" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('rocq-bindings.toggleNoInit', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		let config = vscode.workspace.getConfiguration('coqtop');
		let args = config.get<string[]>('args') ?? [];
		let newargs : string[] = [];
		vscode.window.showInformationMessage('coqtop.args = ' + args);
		vscode.window.showInformationMessage('includes noinit = ' + args?.includes("-noinit"));
		if (args?.includes("-noinit")) { newargs = args.filter(notNoInit); }
		else { args?.push ("-noinit"); newargs = args; }
		config.update ('args', newargs, vscode.ConfigurationTarget.Workspace);

			vscode.window.showInformationMessage('Changed args to ' + newargs);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
