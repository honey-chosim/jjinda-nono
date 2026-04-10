import Link from "next/link";
import Image from "next/image";
import { Profile } from "@/data/mock-profiles";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link href={`/profiles/${profile.id}`} className="block group">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        {/* Photo */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
          <Image
            src={profile.photos[0]}
            alt={profile.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          {/* Requested overlay */}
          {profile.isRequested && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white/90 text-[var(--text)] text-xs font-semibold px-3 py-1.5 rounded-full">
                신청 완료
              </span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Info on photo */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <p className="font-semibold text-sm leading-tight">
              {profile.name}, {profile.age}
            </p>
            <p className="text-xs text-white/80 mt-0.5 truncate">
              {profile.jobTitle}
            </p>
            <p className="text-xs text-white/70 truncate">{profile.residence}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
