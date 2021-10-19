"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToDocumentChanges = exports.refreshDiagnostics = exports.SEMI_MENTION = void 0;
const vscode = require("vscode");
exports.SEMI_MENTION = 'semi_missing';
function refreshDiagnostics(doc, emojiDiagnostics) {
    const diagnostics = [];
    for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
        const lineOfText = doc.lineAt(lineIndex);
        if (!lineOfText.text.includes(';') && lineOfText.text.length != 0 && lineOfText.text != "///" && !lineOfText.text.includes('#')) {
            diagnostics.push(createDiagnostic(doc, lineOfText, lineIndex));
        }
    }
    emojiDiagnostics.set(doc.uri, diagnostics);
}
exports.refreshDiagnostics = refreshDiagnostics;
function createDiagnostic(doc, lineOfText, lineIndex) {
    // find where in the line of thet the 'emoji' is mentioned
    const delta = lineOfText.text.length;
    // create range that represents, where in the document the word is
    const range = new vscode.Range(lineIndex, 0, lineIndex, delta);
    const diagnostic = new vscode.Diagnostic(range, "You forgot semicolon at the end of string", vscode.DiagnosticSeverity.Information);
    diagnostic.code = exports.SEMI_MENTION;
    return diagnostic;
}
function subscribeToDocumentChanges(context, semiDiagnostics) {
    if (vscode.window.activeTextEditor) {
        refreshDiagnostics(vscode.window.activeTextEditor.document, semiDiagnostics);
    }
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            refreshDiagnostics(editor.document, semiDiagnostics);
        }
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(e => refreshDiagnostics(e.document, semiDiagnostics)));
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(doc => semiDiagnostics.delete(doc.uri)));
}
exports.subscribeToDocumentChanges = subscribeToDocumentChanges;
//# sourceMappingURL=diagnostics.js.map