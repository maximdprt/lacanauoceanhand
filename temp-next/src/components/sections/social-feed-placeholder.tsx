import { Camera, ThumbsUp, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { facebookUrl, instagramUrl, socialPosts } from "@/data/site";

function PostCard({ post }: { post: (typeof socialPosts)[number] }) {
  return (
    <Link
      href={post.url}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-3">
        <p className="text-xs font-medium leading-snug text-slate-700 line-clamp-2">{post.title}</p>
      </div>
    </Link>
  );
}

export function SocialFeedPlaceholder() {
  const igPosts = socialPosts.filter((p) => p.platform === "Instagram");
  const fbPosts = socialPosts.filter((p) => p.platform === "Facebook");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Instagram */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-start justify-between gap-2 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Camera size={18} className="text-[#E1306C]" />
            Instagram
          </span>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-ocean transition hover:text-ocean/80"
          >
            @lacanauocehand <ExternalLink size={10} />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-4">
          {igPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="px-5 pb-5">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-full border border-slate-200 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600 transition hover:border-[#E1306C]/50 hover:text-[#E1306C]"
          >
            Voir le profil Instagram
          </a>
        </div>
      </div>

      {/* Facebook */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-start justify-between gap-2 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <ThumbsUp size={18} className="text-[#1877F2]" />
            Facebook
          </span>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-ocean transition hover:text-ocean/80"
          >
            Lacanau OceHand <ExternalLink size={10} />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-4">
          {fbPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="px-5 pb-5">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-full border border-slate-200 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600 transition hover:border-[#1877F2]/50 hover:text-[#1877F2]"
          >
            Voir la page Facebook
          </a>
        </div>
      </div>
    </div>
  );
}

