import * as vscode from 'vscode';
import * as fs from "fs";
import * as path from "path";

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
        const webview = webviewView.webview;
        
        // Set options for the webview
        webview.options = { 
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this.context.extensionUri, 'dist', 'build')
            ]
        };

        // Get the path to the HTML file
        const indexPath = path.join(
            this.context.extensionPath,
            "dist",
            "build",
            "index.html"
        );
        console.log("path----", indexPath);
        
        // Read and transform the HTML content
        let htmlContent = fs.readFileSync(indexPath, "utf-8");
        
        // Transform the content to use webview URIs
        htmlContent = this.rewriteHtmlContent(webview, htmlContent);
        
        // Set the HTML
        webview.html = htmlContent;
    }

    private rewriteHtmlContent(webview: vscode.Webview, htmlContent: string): string {
        // Create a URI for the build directory
        const buildDirUri = vscode.Uri.joinPath(this.context.extensionUri, 'dist', 'build');
        
        // Replace all src and href attributes to use vscode-resource scheme
        return htmlContent
            .replace(
                /(href|src)="([^"]*)"/g,
                (match, attribute, value) => {
                    // Skip absolute URLs or data URIs
                    if (value.startsWith('http') || value.startsWith('data:') || value.startsWith('vscode-webview-resource:')) {
                        return match;
                    }
                    
                    // Convert the path to a webview URI
                    const resourceUri = vscode.Uri.joinPath(buildDirUri, value);
                    const webviewUri = webview.asWebviewUri(resourceUri);
                    
                    return `${attribute}="${webviewUri}"`;
                }
            );
    }
}

export function deactivate() { }
