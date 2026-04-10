import Link from "next/link";
import Image from "next/image";
import type { ProfileView } from "@/types/database";

interface ProfileCardProps {
  profile: ProfileView;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link href={`/profiles/${profile.id}`} className="block group">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
          {profile.photos[0] && (
            <Image
              src={profile.photos[0]}
              alt={profile.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <p className="font-semibold text-sm leading-tight">
              {profile.name}, {profile.age}
            </p>
            <p className="text-xs text-white/80 mt-0.5 truncate">
              {profile.job_title}
            </p>
            <p className="text-xs text-white/70 truncate">{profile.residence}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
