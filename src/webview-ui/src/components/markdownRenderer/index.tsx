import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./style.css";

interface MarkdownRendererProps {
  content: string | undefined;
}

// Custom CodeBlock component
const CodeBlock: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  const codeRef = useRef<HTMLElement>(null);

  const copyToClipboard = (codeText: string) => {
    navigator.clipboard
      .writeText(codeText)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy to clipboard");
      });
  };

  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "plaintext";

  const handleCopy = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText.trim();
      copyToClipboard(codeText);
    }
  };

  return (
    <div className="code-container">
      <div className="code-header">
        <span className="code-language">{language}</span>
        <button className="copy-button" onClick={handleCopy}>
          Copy
        </button>
      </div>
      <pre className="code-block">
        <code ref={codeRef} className={className}>
          {children}
        </code>
      </pre>
    </div>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      rehypePlugins={[rehypeHighlight]}
      components={{
        code({ className, children, ...props }) {
          const isInline = !className;
          if (isInline) {
            return <code className="inline-code">{children}</code>;
          }
          return <CodeBlock className={className}>{children}</CodeBlock>;
        },
      }}
    />
  );
};

export default MarkdownRenderer;