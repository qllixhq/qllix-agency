import type { ProjectContentBlock } from "@/lib/cmsStore";

export interface ParsedProjectText {
  title: string;
  description: string;
  deliverablesText: string;
  contentBlocks: ProjectContentBlock[];
}

interface ImportedSection {
  heading: string;
  lines: string[];
  isOverview: boolean;
}

const headingNames: Record<string, string> = {
  "project overview": "Project Overview",
  "project scope": "Project Scope",
  "design focus": "Design Focus",
  "closing text": "Closing Text",
};

function cleanLine(value: string) {
  return value.replace(/^#{1,6}\s*/, "").replace(/\*\*/g, "").trim();
}

export function parseStructuredProjectText(value: string): ParsedProjectText | null {
  const source = value
    .replace(/\r/g, "")
    .replace(/([^\n])\s+(#{1,6}\s+)/g, "$1\n$2");
  const sections: ImportedSection[] = [];
  const intro: string[] = [];
  let title = "";
  let current: ImportedSection | null = null;

  for (const rawLine of source.split("\n")) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    const markdownHeading = trimmed.match(/^(#{1,6})\s*(.*)$/);
    const line = cleanLine(trimmed);
    const headingText = markdownHeading ? cleanLine(markdownHeading[2]) : line;
    const inlineHeading = headingText.match(/^(Project Overview|Project Scope|Design Focus|Closing Text)\b\s*:?\s*(.*)$/i);
    const namedHeading = headingNames[(inlineHeading?.[1] || headingText.replace(/:$/, "")).toLowerCase()];

    if (namedHeading || markdownHeading) {
      if (markdownHeading?.[1].length === 1 && !title && !sections.length && !intro.length && !namedHeading) {
        title = headingText;
        current = null;
        continue;
      }
      current = {
        heading: namedHeading || headingText.replace(/:$/, ""),
        lines: [],
        isOverview: namedHeading === "Project Overview",
      };
      sections.push(current);
      const remainder = inlineHeading?.[2]?.trim() || (
        markdownHeading && !namedHeading
          ? headingText.match(/^[^:]+:\s*(.+)$/)?.[1]?.trim()
          : ""
      );
      if (remainder) current.lines.push(remainder);
      continue;
    }

    const content = cleanLine(trimmed);
    if (!content) continue;

    if (!title && content.length <= 80 && !/[.!?]$/.test(content)) {
      title = content;
    } else if (current) {
      current.lines.push(content.replace(/^[*+\-]\s+/, "- ").replace(/^\u2022\s+/, "- "));
    } else {
      intro.push(content);
    }
  }

  const overview = sections.find((section) => section.isOverview);
  const description = (overview?.lines.length ? overview.lines : intro).join(" ").trim();
  const scope = sections.find((section) => section.heading === "Project Scope");
  const deliverables = (scope?.lines || [])
    .map((line) => line.replace(/^[*+\-]\s+/, "").trim())
    .filter(Boolean);
  const contentBlocks = sections
    .filter((section) => !section.isOverview && section.lines.length)
    .map((section, index) => ({
      id: `imported-text-${index}-${section.heading.toLowerCase().replace(/\s+/g, "-")}`,
      type: "text" as const,
      heading: section.heading,
      body: section.lines.join("\n"),
    }));

  if (!sections.length) return null;
  return { title, description, deliverablesText: deliverables.join(", "), contentBlocks };
}
