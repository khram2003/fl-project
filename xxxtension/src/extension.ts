import * as vscode from 'vscode';
import { subscribeToDocumentChanges, SEMI_MENTION } from './diagnostics';

const COMMAND = 'code-actions-sample.command';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('xxx', new Semicolonzer(), {
			providedCodeActionKinds: Semicolonzer.providedCodeActionKinds
		}));

	const semiDiagnostics = vscode.languages.createDiagnosticCollection("semicolon");
	context.subscriptions.push(semiDiagnostics);

	subscribeToDocumentChanges(context, semiDiagnostics);

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('xxx', new Semicolonnfo(), {
			providedCodeActionKinds: Semicolonnfo.providedCodeActionKinds
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(COMMAND, () => vscode.env.openExternal(vscode.Uri.parse('https://www.youtube.com/watch?v=dQw4w9WgXcQ')))
	);
}

/**
 * Provides code actions for converting :) to a smiley semi.
 */
export class Semicolonzer implements vscode.CodeActionProvider {

	public static readonly providedCodeActionKinds = [
		vscode.CodeActionKind.QuickFix
	];

	public provideCodeActions(document: vscode.TextDocument, range: vscode.Range): vscode.CodeAction[] | undefined {
		if (this.isSemicolon(document, range)) {
			return;
		}

		const addSemiColon = this.createFix(document, new vscode.Range(range.end, range.end), ';');
		addSemiColon.isPreferred = true;
		const commandAction = this.createCommand();

		return [
			addSemiColon,
			commandAction
		];
	}

	private isSemicolon(document: vscode.TextDocument, range: vscode.Range) {
		const end = range.end;
		const line = document.lineAt(end.line);
		return line.text.includes(';') || line.text.includes('#') || line.text === "///";
	}

	private createFix(document: vscode.TextDocument, range: vscode.Range, semi: string): vscode.CodeAction {
		const fix = new vscode.CodeAction(`Insert ;`, vscode.CodeActionKind.QuickFix);
		fix.edit = new vscode.WorkspaceEdit();
		fix.edit.replace(document.uri, new vscode.Range(range.end, range.end.translate(0, 0)), semi);
		return fix;
	}

	private createCommand(): vscode.CodeAction {
		const action = new vscode.CodeAction('Learn more...', vscode.CodeActionKind.Empty);
		action.command = { command: COMMAND, title: 'Learn more about semis', tooltip: 'This will open the unicode semi page.' };
		return action;
	}
}

/**
 * Provides code actions corresponding to diagnostic problems.
 */
export class Semicolonnfo implements vscode.CodeActionProvider {

	public static readonly providedCodeActionKinds = [
		vscode.CodeActionKind.QuickFix
	];

	provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
		// for each diagnostic entry that has the matching `code`, create a code action command
		return context.diagnostics
			.filter(diagnostic => diagnostic.code === SEMI_MENTION)
			.map(diagnostic => this.createCommandCodeAction(diagnostic));
	}

	private createCommandCodeAction(diagnostic: vscode.Diagnostic): vscode.CodeAction {
		const action = new vscode.CodeAction('Learn more...', vscode.CodeActionKind.QuickFix);
		action.command = { command: COMMAND, title: 'Learn more about semis', tooltip: 'This will open the unicode semi page.' };
		action.diagnostics = [diagnostic];
		action.isPreferred = true;
		return action;
	}
}