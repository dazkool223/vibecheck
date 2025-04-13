import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";

// Define props interface
interface MarkdownRendererProps {
  markdown?: string;
  className?: string;
}

export default function MarkdownRenderer({
  markdown = "",
  className = "",
}: MarkdownRendererProps) {
  const [html, setHtml] = useState<string>("");

  // Example markdown content
  const exampleMarkdown = `
# Markdown Example

1. **Visual Design**:
   * Clean, minimal UI with a color scheme inspired by Claude's website
   * Properly styled message bubbles that differentiate between user and AI 

2. **Key Features**:
   * Auto-scrolling messages container
   * Support for code blocks:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

## Blockquotes

> This is a blockquote example
> It can span multiple lines

You can also include ~~strikethrough~~ text or [links](https://example.com).

![Image description](https://via.placeholder.com/150)

- Unordered list item 1
- Unordered list item 2
  - Nested item
  `;

  useEffect(() => {
    // Configure marked options
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown
      breaks: true, // Convert \n to <br>
      async: false, // Synchronous rendering
    });

    // Parse markdown and sanitize HTML
    const contentToRender = markdown || exampleMarkdown;
    const rawHtml = marked(contentToRender) as string;
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);

    setHtml(sanitizedHtml);
  }, [markdown]);

  return (
    <Card
      className={`w-full max-w-3xl mx-auto p-6 rounded-lg bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-violet-600" />
        <h2 className="font-medium text-lg">AI Summary</h2>
      </div>

      <ScrollArea className="max-h-[600px] pr-4">
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </ScrollArea>
    </Card>
  );
}
