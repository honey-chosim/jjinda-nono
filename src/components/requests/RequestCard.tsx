import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import type { RequestWithRequester } from "@/types/database";

interface RequestCardProps {
  request: RequestWithRequester;
}

export default function RequestCard({ request }: RequestCardProps) {
  const requester = request.requester;
  if (!requester) return null;
  const currentYear = new Date().getFullYear();
  const age = currentYear - requester.birth_year + 1;
  const residence = requester.residence_district
    ? `${requester.residence_city} ${requester.residence_district}`
    : (requester.residence_city ?? '');

  return (
    <div className="flex items-center gap-4 bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-4 shadow-sm">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        {requester.photos[0] && (
          <Image
            src={requester.photos[0]}
            alt={requester.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-[var(--text)]">
          {requester.name}, {age}
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
          {requester.job_title} · {residence}
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          {new Date(request.created_at).toLocaleDateString("ko-KR", {
            month: "long",
            day: "numeric",
          })}{" "}
          요청
        </p>
      </div>
      <Link href={`/requests/${request.id}`} className="flex-shrink-0">
        <Button size="sm" variant="outline">
          상세 보기
        </Button>
      </Link>
    </div>
  );
}
