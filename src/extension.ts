import * as vscode from 'vscode';
import { getWebviewContent } from "./webviewContent";

export function activate(context: vscode.ExtensionContext) {
    console.log(context.extensionUri);

    const provider = new SidebarProvider(context)
    // register the sidebar 
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "conceptsView",
            provider
        )
    )
}

class SidebarProvider implements vscode.WebviewViewProvider {
    constructor(private context: vscode.ExtensionContext) {
        console.log(" - SidebarProvider constructor");
    }

    public resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.options = { enableScripts: true };
        webviewView.webview.html = getWebviewContent(this.context);
        console.log("- SidebarProvider resolveWebviewView");
    }
}

export function deactivate() { }
