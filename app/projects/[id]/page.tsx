"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { useCms } from "@/context/CmsContext";
import { PortfolioItem, ProjectContentBlock } from "@/lib/cmsStore";
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

  const blocks = project.contentBlocks?.length ? project.contentBlocks : legacyBlocks(project);
  const projectUrl = project.projectUrl;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07050E] text-[#101224]" style={{ "--brand-primary": primaryColor, "--brand-secondary": secondaryColor, "--brand-soft": brandSoft } as React.CSSProperties}>
      <SubpageHeroBanner
        breadcrumb="Projects"
        title={<span>{project.title}</span>}
      />

      <div className="relative z-10 -mt-6 rounded-t-[36px] border-t border-black/5 bg-white px-5 pb-20 pt-10 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] sm:-mt-8 sm:rounded-t-[48px] sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
        <div className="mx-auto max-w-[1120px]">
          <section style={{ backgroundColor: brandSoft }} className="overflow-hidden rounded-[18px] p-3 sm:p-5">
            <img src={project.imageUrl} alt={project.title} className="aspect-[16/10] w-full rounded-[17px] object-cover sm:rounded-[22px]" />
          </section>

          <section className="grid gap-6 border-b border-black/10 py-12 sm:py-16 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">Project overview</p>
              <p className="mt-4 max-w-2xl text-xl leading-8 tracking-[-0.025em] text-black/70 sm:text-2xl sm:leading-9">{project.description}</p>
            </div>
            <div className="grid grid-cols-2 content-start gap-6 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/40">Client</p>
                <p className="mt-2 font-semibold">{project.client || "Confidential"}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-black/40">Services</p>
                <p className="mt-2 font-semibold">{project.deliverables?.slice(0, 2).join(" · ") || project.category}</p>
              </div>
              {projectUrl && (
                <a href={projectUrl} target="_blank" rel="noreferrer" style={{ backgroundColor: secondaryColor }} className="col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-white transition hover:opacity-85">
                  Visit project <ExternalLink size={16} />
                </a>
              )}
            </div>
          </section>

          <section className="space-y-10 py-12 sm:space-y-14 sm:py-20">
            {blocks.map((block) => <StoryBlock key={block.id} block={block} />)}
          </section>
        </div>
      </div>
    </main>
  );
}

function StoryBlock({ block }: { block: ProjectContentBlock }) {
  if (block.type === "text") {
    return (
      <section className="mx-auto max-w-3xl py-4">
        {block.heading && <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">{block.heading}</h2>}
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
