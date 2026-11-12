import Image from "next/image";
import Link from "next/link";
import { LivePreviewThumb } from "@/components/LivePreviewThumb";
import type { Template } from "@/lib/types";
import { getSafeVercelUrl } from "@/lib/url";

interface TemplateCardProps {
  template: Template;
  number: number;
}

export function TemplateCard({ template, number }: TemplateCardProps) {
  const hasThumbnail = Boolean(template.thumbnail);
  const liveUrl = getSafeVercelUrl(template);
  const label = String(number).padStart(2, "0");
  const href = `/preview/${template.slug}`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(40,20,20,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(40,20,20,0.1)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-[#f3efeb]">
        {hasThumbnail ? (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <Image
              src={template.thumbnail!}
              alt={`${template.name} preview`}
              width={320}
              height={180}
              className="max-h-full w-auto max-w-[78%] object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        ) : liveUrl ? (
          <LivePreviewThumb url={liveUrl} title={template.name} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-sm font-medium text-charcoal/55">
              {template.name}
            </p>
            <p className="text-xs text-charcoal/40">Add a valid Vercel URL</p>
          </div>
        )}

        <div className="absolute left-3 top-3 z-[2]">
          <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-maroon px-2.5 text-sm font-semibold tracking-wide text-white shadow-sm">
            {label}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="text-base font-semibold tracking-tight text-charcoal">
          {template.name}
        </h2>
        <span className="inline-flex w-fit items-center rounded-full bg-ready px-3.5 py-1.5 text-sm font-medium text-ready-text transition group-hover:brightness-95">
          Ready to view
        </span>
      </div>
    </Link>
  );
}
