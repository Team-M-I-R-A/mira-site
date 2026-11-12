import React from "react";

type MarkdownProps = {
  content: string;
};

const headingPattern = /^(#{1,4})\s+(.*)$/;
const listPattern = /^\s*[*-]\s+(.*)$/;
const hrPattern = /^---+$/;

function isBlockStart(line: string) {
  const trimmed = line.trim();
  return (
    headingPattern.test(trimmed) ||
    listPattern.test(line) ||
    hrPattern.test(trimmed) ||
    trimmed.startsWith("|")
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderInline(text: string, keyPrefix: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-inline-${index}`;

    if (token.startsWith("**")) {
      parts.push(
        <strong key={key} className="font-semibold text-dark-100">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      parts.push(
        <code
          key={key}
          className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.8em] text-[#00798f]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        parts.push(
          <a
            key={key}
            href={link[2]}
            className="font-medium text-[#00798f] underline decoration-[#00798f]/30 underline-offset-2 transition-colors hover:decoration-[#00798f]"
          >
            {link[1]}
          </a>,
        );
      } else {
        parts.push(token);
      }
    }

    lastIndex = pattern.lastIndex;
    index += 1;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isSeparatorRow(cells: string[]) {
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

export default function Markdown({ content }: MarkdownProps) {
  const lines = content.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let lineIndex = 0;
  let blockIndex = 0;

  while (lineIndex < lines.length) {
    const line = lines[lineIndex];
    const trimmed = line.trim();

    if (!trimmed) {
      lineIndex += 1;
      continue;
    }

    if (hrPattern.test(trimmed)) {
      blocks.push(
        <hr
          key={`hr-${blockIndex}`}
          className="my-9 h-px border-0 bg-white/5"
        />,
      );
      blockIndex += 1;
      lineIndex += 1;
      continue;
    }

    const heading = trimmed.match(headingPattern);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const key = `heading-${blockIndex}`;
      const id = slugify(text);

      if (level <= 2) {
        blocks.push(
          <h2
            key={key}
            id={id}
            className="mb-4 mt-10 scroll-mt-28 font-display text-2xl font-semibold leading-tight text-white first:mt-0"
          >
            {renderInline(text, key)}
          </h2>,
        );
      } else if (level === 3) {
        blocks.push(
          <h3
            key={key}
            id={id}
            className="mb-2.5 mt-7 scroll-mt-28 font-display text-lg font-semibold leading-snug text-white"
          >
            {renderInline(text, key)}
          </h3>,
        );
      } else {
        blocks.push(
          <h4
            key={key}
            id={id}
            className="mb-2 mt-6 scroll-mt-28 font-body text-sm font-semibold uppercase tracking-wider text-dark-200"
          >
            {renderInline(text, key)}
          </h4>,
        );
      }

      blockIndex += 1;
      lineIndex += 1;
      continue;
    }

    if (listPattern.test(line)) {
      const items: string[] = [];
      while (lineIndex < lines.length) {
        const item = lines[lineIndex].match(listPattern);
        if (!item) break;
        items.push(item[1]);
        lineIndex += 1;
      }

      blocks.push(
        <ul key={`list-${blockIndex}`} className="mb-5 list-none space-y-2.5">
          {items.map((item, itemIndex) => (
            <li
              key={`list-${blockIndex}-item-${itemIndex}`}
              className="relative pl-5 font-body text-[0.9375rem] leading-relaxed text-dark-400"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-[#00798f]"
              />
              {renderInline(item, `list-${blockIndex}-item-${itemIndex}`)}
            </li>
          ))}
        </ul>,
      );
      blockIndex += 1;
      continue;
    }

    if (trimmed.startsWith("|")) {
      const rows: string[][] = [];
      while (
        lineIndex < lines.length &&
        lines[lineIndex].trim().startsWith("|")
      ) {
        rows.push(parseTableRow(lines[lineIndex]));
        lineIndex += 1;
      }

      if (rows.length > 0) {
        const header = rows[0];
        const body = rows.slice(1).filter((row) => !isSeparatorRow(row));

        blocks.push(
          <div
            key={`table-${blockIndex}`}
            className="my-6 overflow-x-auto rounded-2xl border border-white/10"
          >
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-white/3">
                <tr>
                  {header.map((cell, cellIndex) => (
                    <th
                      key={`table-${blockIndex}-head-${cellIndex}`}
                      scope="col"
                      className="whitespace-nowrap px-4 py-3 font-body text-xs font-semibold uppercase tracking-wider text-dark-100"
                    >
                      {renderInline(cell, `table-${blockIndex}-head-${cellIndex}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, rowIndex) => (
                  <tr key={`table-${blockIndex}-row-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`table-${blockIndex}-row-${rowIndex}-cell-${cellIndex}`}
                        className="border-t border-white/5 px-4 py-3 align-top font-body leading-relaxed text-dark-400"
                      >
                        {renderInline(
                          cell,
                          `table-${blockIndex}-row-${rowIndex}-cell-${cellIndex}`,
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
      }

      blockIndex += 1;
      continue;
    }

    const paragraph: string[] = [];
    while (
      lineIndex < lines.length &&
      lines[lineIndex].trim() &&
      !isBlockStart(lines[lineIndex])
    ) {
      paragraph.push(lines[lineIndex].trim());
      lineIndex += 1;
    }

    blocks.push(
      <p
        key={`paragraph-${blockIndex}`}
        className="mb-4 font-body text-[0.9375rem] leading-relaxed text-dark-400"
      >
        {renderInline(paragraph.join(" "), `paragraph-${blockIndex}`)}
      </p>,
    );
    blockIndex += 1;
  }

  return <div className="max-w-none">{blocks}</div>;
}
