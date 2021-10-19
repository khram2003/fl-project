"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Semicolonnfo = exports.Semicolonzer = exports.activate = void 0;
const vscode = require("vscode");
const diagnostics_1 = require("./diagnostics");
const COMMAND = 'code-actions-sample.command';
function activate(context) {
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider('xxx', new Semicolonzer(), {
        providedCodeActionKinds: Semicolonzer.providedCodeActionKinds
    }));
    const semiDiagnostics = vscode.languages.createDiagnosticCollection("semicolon");
    context.subscriptions.push(semiDiagnostics);
    (0, diagnostics_1.subscribeToDocumentChanges)(context, semiDiagnostics);
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider('xxx', new Semicolonnfo(), {
        providedCodeActionKinds: Semicolonnfo.providedCodeActionKinds
    }));
    context.subscriptions.push(vscode.commands.registerCommand(COMMAND, () => vscode.env.openExternal(vscode.Uri.parse('https://www.youtube.com/watch?v=dQw4w9WgXcQ'))));
}
exports.activate = activate;
/**
 * Provides code actions for converting :) to a smiley semi.
 */
class Semicolonzer {
    provideCodeActions(document, range) {
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
    isSemicolon(document, range) {
        const end = range.end;
        const line = document.lineAt(end.line);
        return line.text.includes(';') || line.text.includes('#') || line.text === "///";
    }
    createFix(document, range, semi) {
        const fix = new vscode.CodeAction(`Insert ;`, vscode.CodeActionKind.QuickFix);
        fix.edit = new vscode.WorkspaceEdit();
        fix.edit.replace(document.uri, new vscode.Range(range.end, range.end.translate(0, 0)), semi);
        return fix;
    }
    createCommand() {
        const action = new vscode.CodeAction('Learn more...', vscode.CodeActionKind.Empty);
        action.command = { command: COMMAND, title: 'Learn more about semis', tooltip: 'This will open the unicode semi page.' };
        return action;
    }
}
exports.Semicolonzer = Semicolonzer;
Semicolonzer.providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix
];
/**
 * Provides code actions corresponding to diagnostic problems.
 */
class Semicolonnfo {
    provideCodeActions(document, range, context, token) {
        // for each diagnostic entry that has the matching `code`, create a code action command
        return context.diagnostics
            .filter(diagnostic => diagnostic.code === diagnostics_1.SEMI_MENTION)
            .map(diagnostic => this.createCommandCodeAction(diagnostic));
    }
    createCommandCodeAction(diagnostic) {
        const action = new vscode.CodeAction('Learn more...', vscode.CodeActionKind.QuickFix);
        action.command = { command: COMMAND, title: 'Learn more about semis', tooltip: 'This will open the unicode semi page.' };
        action.diagnostics = [diagnostic];
        action.isPreferred = true;
        return action;
    }
}
exports.Semicolonnfo = Semicolonnfo;
Semicolonnfo.providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix
];
//# sourceMappingURL=extension.js.map