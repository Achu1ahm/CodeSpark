import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('CodeSpark now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand('codespark.openConcept', () => {
		
		vscode.window.showInformationMessage('Hello World from CodeSpark!');
	})
	);
}

export function deactivate() {}
