import * as vscode from "vscode";

export function getWebviewContent(context: vscode.ExtensionContext): string {

  const scriptUri = vscode.Uri.joinPath(
    context.extensionUri,
    "dist",
    "extension.js"
  ).with({ scheme: "vscode-resource" });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Concepts Sidebar</title>
       <script src="${scriptUri}"></script>
    </head>
    <body>
      <div id="root">
      </div>
    </body>
    </html>
  `;
}
