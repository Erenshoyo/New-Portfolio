import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split by double line breaks to get paragraphs / blocks
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-4 text-base-content/85 leading-relaxed text-sm">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Check for headers
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={idx} className="text-2xl font-bold text-base-content mt-6 mb-2 border-b border-base-content/10 pb-1">
              {parseInline(trimmed.slice(2))}
            </h1>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-xl font-bold text-base-content mt-5 mb-2">
              {parseInline(trimmed.slice(3))}
            </h2>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-lg font-bold text-base-content mt-4 mb-2">
              {parseInline(trimmed.slice(4))}
            </h3>
          );
        }

        // Check for lists
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split(/\n[*-]\s+/);
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1.5 my-3 text-base-content/85">
              {items.map((item, itemIdx) => {
                const text = itemIdx === 0 ? item.replace(/^[*-]\s+/, '') : item;
                return <li key={itemIdx}>{parseInline(text)}</li>;
              })}
            </ul>
          );
        }

        // Check for code block
        if (trimmed.startsWith('```') && trimmed.endsWith('```')) {
          const lines = trimmed.split('\n');
          const code = lines.slice(1, -1).join('\n');
          return (
            <pre key={idx} className="p-4 rounded-xl bg-base-300/80 border border-base-content/5 font-mono text-xs overflow-x-auto my-3 text-base-content/90">
              <code>{code}</code>
            </pre>
          );
        }

        // Default paragraph
        return (
          <p key={idx} className="whitespace-pre-line">
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// Simple inline parser for bold, italic, inline code, and links
function parseInline(text: string): React.ReactNode[] {
  let parts: React.ReactNode[] = [text];

  // 1. Parse Links: [text](url)
  parts = parts.flatMap((part) => {
    if (typeof part !== 'string') return part;
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = Array.from(part.matchAll(regex));
    if (matches.length === 0) return part;

    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    matches.forEach((match, idx) => {
      const start = match.index!;
      if (start > lastIndex) {
        result.push(part.substring(lastIndex, start));
      }
      result.push(
        <a
          key={`link-${idx}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-primary hover:underline font-semibold"
        >
          {match[1]}
        </a>
      );
      lastIndex = start + match[0].length;
    });
    if (lastIndex < part.length) {
      result.push(part.substring(lastIndex));
    }
    return result;
  });

  // 2. Parse Bold: **text** or __text__
  parts = parts.flatMap((part) => {
    if (typeof part !== 'string') return part;
    const regex = /(\*\*|__)(.*?)\1/g;
    const matches = Array.from(part.matchAll(regex));
    if (matches.length === 0) return part;

    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    matches.forEach((match, idx) => {
      const start = match.index!;
      if (start > lastIndex) {
        result.push(part.substring(lastIndex, start));
      }
      result.push(<strong key={`bold-${idx}`} className="font-bold text-base-content">{match[2]}</strong>);
      lastIndex = start + match[0].length;
    });
    if (lastIndex < part.length) {
      result.push(part.substring(lastIndex));
    }
    return result;
  });

  // 3. Parse Italic: *text* or _text_
  parts = parts.flatMap((part) => {
    if (typeof part !== 'string') return part;
    const regex = /(\*|_)(.*?)\1/g;
    const matches = Array.from(part.matchAll(regex));
    if (matches.length === 0) return part;

    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    matches.forEach((match, idx) => {
      const start = match.index!;
      if (start > lastIndex) {
        result.push(part.substring(lastIndex, start));
      }
      result.push(<em key={`italic-${idx}`} className="italic">{match[2]}</em>);
      lastIndex = start + match[0].length;
    });
    if (lastIndex < part.length) {
      result.push(part.substring(lastIndex));
    }
    return result;
  });

  // 4. Parse Inline Code: `code`
  parts = parts.flatMap((part) => {
    if (typeof part !== 'string') return part;
    const regex = /`(.*?)`/g;
    const matches = Array.from(part.matchAll(regex));
    if (matches.length === 0) return part;

    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    matches.forEach((match, idx) => {
      const start = match.index!;
      if (start > lastIndex) {
        result.push(part.substring(lastIndex, start));
      }
      result.push(
        <code key={`code-${idx}`} className="px-1.5 py-0.5 rounded bg-base-200 text-brand-secondary font-mono text-xs border border-base-content/5">
          {match[1]}
        </code>
      );
      lastIndex = start + match[0].length;
    });
    if (lastIndex < part.length) {
      result.push(part.substring(lastIndex));
    }
    return result;
  });

  return parts;
}
