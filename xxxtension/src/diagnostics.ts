import * as vscode from 'vscode';

export const SEMI_MENTION = 'semi_missing';

export function refreshDiagnostics(doc: vscode.TextDocument, emojiDiagnostics: vscode.DiagnosticCollection): void {
	const diagnostics: vscode.Diagnostic[] = [];

	for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
		const lineOfText = doc.lineAt(lineIndex);
		if (!lineOfText.text.includes(';') && lineOfText.text.length != 0 && lineOfText.text != "///" && !lineOfText.text.includes('#')) {
			diagnostics.push(createDiagnostic(doc, lineOfText, lineIndex));
		}
	}

	emojiDiagnostics.set(doc.uri, diagnostics);
}

function createDiagnostic(doc: vscode.TextDocument, lineOfText: vscode.TextLine, lineIndex: number): vscode.Diagnostic {
	// find where in the line of thet the 'emoji' is mentioned
	const delta = lineOfText.text.length;

	// create range that represents, where in the document the word is
	const range = new vscode.Range(lineIndex, 0, lineIndex, delta);

	const diagnostic = new vscode.Diagnostic(range, "You forgot semicolon at the end of string",
		vscode.DiagnosticSeverity.Information);
	diagnostic.code = SEMI_MENTION;
	return diagnostic;
}

export function subscribeToDocumentChanges(context: vscode.ExtensionContext, semiDiagnostics: vscode.DiagnosticCollection): void {
	if (vscode.window.activeTextEditor) {
		refreshDiagnostics(vscode.window.activeTextEditor.document, semiDiagnostics);
	}
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				refreshDiagnostics(editor.document, semiDiagnostics);
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => refreshDiagnostics(e.document, semiDiagnostics))
	);

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument(doc => semiDiagnostics.delete(doc.uri))
	);

}