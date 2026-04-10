import Link from "next/link";
import Image from "next/image";
import { Request } from "@/data/mock-requests";
import Button from "@/components/ui/Button";

interface RequestCardProps {
  request: Request;
}

export default function RequestCard({ request }: RequestCardProps) {
  return (
    <div className="flex items-center gap-4 bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-4 shadow-sm">
      {/* Photo */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        <Image
          src={request.requesterPhotos[0]}
          alt={request.requesterName}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-[var(--text)]">
          {request.requesterName}, {request.requesterAge}
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
          {request.requesterJob} · {request.requesterResidence}
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          {new Date(request.receivedAt).toLocaleDateString("ko-KR", {
            month: "long",
            day: "numeric",
          })}{" "}
          요청
        </p>
      </div>
      {/* Button */}
      <Link href={`/requests/${request.id}`} className="flex-shrink-0">
        <Button size="sm" variant="outline">
          상세 보기
        </Button>
      </Link>
    </div>
  );
}
