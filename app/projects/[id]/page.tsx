"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCms } from "@/context/CmsContext";
import { PortfolioItem, ProjectContentBlock } from "@/lib/cmsStore";
import { parseStructuredProjectText } from "@/lib/portfolioText";
import SubpageHeroBanner from "@/components/SubpageHeroBanner";

function legacyBlocks(project: PortfolioItem): ProjectContentBlock[] {
  const blocks: ProjectContentBlock[] = [];
  if (project.galleryImages?.length) {
    blocks.push({ id: `${project.id}-legacy-gallery`, type: "gallery", galleryImages: project.galleryImages });
  }
  if (project.videoUrl) {
    blocks.push({ id: `${project.id}-legacy-video`, type: "video", videoUrl: project.videoUrl });
  }
  return blocks;
}

function videoEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

function ProjectVideo({ url }: { url: string }) {
  const embedUrl = videoEmbedUrl(url);
  if (embedUrl) {
    return <iframe src={embedUrl} title="Project video" className="aspect-video w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />;
  }
  return <video src={url} controls className="aspect-video w-full bg-black" />;
}

export default function PublicProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { cmsData, isLoaded } = useCms();
  const primaryColor = cmsData.general.primaryColor || "#00FF87";
  const secondaryColor = cmsData.general.secondaryColor || "#02180C";
  const brandSoft = /^#[0-9a-f]{6}$/i.test(primaryColor) ? `${primaryColor}18` : "#eaf8f1";
  const project = cmsData.portfolioItems.find((item) => item.id === projectId);

  if (!isLoaded) {
    return <main className="min-h-screen bg-white" />;
  }

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 text-center text-[#101224]">
        <div>
          <p style={{ color: primaryColor }} className="text-sm font-bold uppercase tracking-[0.2em]">Project not found</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">This project is unavailable.</h1>
          <Link href="/projects" style={{ backgroundColor: secondaryColor }} className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white">
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  // An empty array is an intentional choice in the editor; only projects that
  // predate the story editor fall back to their old gallery/video fields.
  const blocks = Array.isArray(project.contentBlocks) ? project.contentBlocks : legacyBlocks(project);
  const parsedDescription = parseStructuredProjectText(project.description);
  const hasStructuredDescription = Boolean(
    parsedDescription &&
      (parsedDescription.contentBlocks.length > 0 || parsedDescription.description !== project.description)
  );
  const overview = hasStructuredDescription
    ? parsedDescription?.description || ""
    : project.description;
  const storyBlocks = blocks.filter((block) => block.type !== "text");
  const deliverables = project.deliverables || [];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07050E] text-[#101224]" style={{ "--brand-primary": primaryColor, "--brand-secondary": secondaryColor, "--brand-soft": brandSoft } as React.CSSProperties}>
      <SubpageHeroBanner
        breadcrumb="Projects"
        title={<span>{project.title}</span>}
      />

      <div className="relative z-10 -mt-6 rounded-t-[36px] border-t border-black/5 bg-white px-5 pb-20 pt-7 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] sm:-mt-8 sm:rounded-t-[48px] sm:px-8 sm:pt-9 lg:px-12 lg:pt-10">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid items-start gap-6 border-b border-black/10 pb-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-10 sm:pb-10 lg:gap-14">
          <section style={{ aspectRatio: "5 / 4" }} className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[18px]">
            <img src={project.imageUrl} alt={project.title} className="absolute inset-0 h-full w-full rounded-[17px] object-cover sm:rounded-[22px]" />
          </section>

          <section className="grid min-w-0 gap-6 md:py-2">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">Project overview</p>
              <p className="mt-3 whitespace-pre-line text-base leading-7 tracking-[-0.015em] text-black/70 lg:text-lg lg:leading-8">{overview}</p>
            </div>
            <dl className="grid content-start grid-cols-2 gap-5 border-t border-black/10 pt-5">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">Client</dt>
                <dd className="mt-2 text-base font-semibold text-[#101224] sm:text-lg">{project.client || "Confidential"}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">Services</dt>
                <dd className="mt-2 text-base font-semibold text-[#101224] sm:text-lg">{deliverables.length ? deliverables.join(", ") : project.category}</dd>
              </div>
            </dl>
          </section>
          </div>


          <section className="space-y-6 py-8 sm:space-y-8 sm:py-10">
            <StoryBlocks blocks={storyBlocks} />
          </section>

          <section style={{ backgroundColor: secondaryColor }} className="relative isolate mt-12 overflow-hidden rounded-[24px] px-6 py-9 text-white sm:mt-16 sm:px-10 sm:py-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block">
              <img src="/images/project-cta-ribbon.png" alt="" className="h-full w-full object-cover object-[58%_center] opacity-70 mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-secondary)] via-[color-mix(in_srgb,var(--brand-secondary)_25%,transparent)] to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p style={{ color: primaryColor }} className="text-xs font-bold uppercase tracking-[0.18em]">Build your next standout project</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">Want this level of clarity for your brand?</h2>
                <p className="mt-3 max-w-xl text-base leading-7 text-white/70">Share your goal with us and we&apos;ll turn it into a focused visual system that is built to be remembered.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {(deliverables.length ? deliverables : [project.category]).map((service) => (
                    <span key={service} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">{service}</span>
                  ))}
                </div>
              </div>
              <Link href="/contact" style={{ backgroundColor: primaryColor, color: secondaryColor }} className="inline-flex shrink-0 items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold transition hover:scale-[1.02]">
                Become a client <span className="ml-2 text-lg leading-none">-&gt;</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StoryBlocks({ blocks }: { blocks: ProjectContentBlock[] }) {
  const rendered: React.ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const nextBlock = blocks[index + 1];
    const isScopeAndFocusPair =
      block.type === "text" &&
      nextBlock?.type === "text" &&
      block.heading?.trim().toLowerCase() === "project scope" &&
      nextBlock.heading?.trim().toLowerCase() === "design focus";

    if (isScopeAndFocusPair) {
      rendered.push(
        <div key={`${block.id}-${nextBlock.id}`} className="grid gap-10 border-y border-black/10 py-10 md:grid-cols-2 md:gap-16 lg:gap-24">
          <StoryBlock block={block} compact />
          <StoryBlock block={nextBlock} compact />
        </div>,
      );
      index += 1;
      continue;
    }

    rendered.push(<StoryBlock key={block.id} block={block} />);
  }

  return <>{rendered}</>;
}

function StoryBlock({ block, compact = false }: { block: ProjectContentBlock; compact?: boolean }) {
  if (block.type === "text") {
    return (
      <section className={compact ? "min-w-0" : "mx-auto max-w-3xl py-4"}>
        {block.heading && <h2 className={compact ? "text-3xl font-semibold tracking-[-0.05em] sm:text-4xl" : "text-3xl font-semibold tracking-[-0.05em] sm:text-5xl"}>{block.heading}</h2>}
        {block.body && <p className="mt-5 whitespace-pre-line text-base leading-8 text-black/65 sm:text-lg">{block.body}</p>}
      </section>
    );
  }

  if (block.type === "image" && block.imageUrl) {
    return (
      <figure>
        <img src={block.imageUrl} alt={block.caption || "Project detail"} className="w-full rounded-[20px] object-cover" />
        {block.caption && <figcaption className="mt-3 text-center text-sm text-black/45">{block.caption}</figcaption>}
      </figure>
    );
  }

  if (block.type === "video" && block.videoUrl) {
    return <section className="overflow-hidden rounded-[20px] bg-black"><ProjectVideo url={block.videoUrl} /></section>;
  }

  if (block.type === "gallery" && block.galleryImages?.length) {
    return (
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {block.galleryImages.map((image, index) => (
          <img key={`${image}-${index}`} src={image} alt={`Project gallery image ${index + 1}`} className={`w-full rounded-[18px] object-cover ${block.galleryImages!.length % 2 === 1 && index === 0 ? "sm:col-span-2" : ""}`} />
        ))}
      </section>
    );
  }

  return null;
}
