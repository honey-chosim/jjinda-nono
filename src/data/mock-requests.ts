export interface Request {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterAge: number;
  requesterJob: string;
  requesterCompany: string;
  requesterResidence: string;
  requesterHeight: number;
  requesterEducation: string;
  requesterSchool: string;
  requesterSmoking: string;
  requesterDrinking: string;
  requesterMbti: string;
  requesterHobbies: string[];
  requesterPet: string;
  requesterBio: string;
  requesterPhotos: string[];
  status: "pending" | "accepted" | "rejected" | "expired";
  receivedAt: string;
}

export const mockRequests: Request[] = [
  {
    id: "r1",
    requesterId: "f1",
    requesterName: "송지아",
    requesterAge: 27,
    requesterJob: "마케터",
    requesterCompany: "CJ ENM",
    requesterResidence: "서울 마포구",
    requesterHeight: 163,
    requesterEducation: "대졸",
    requesterSchool: "홍익대학교",
    requesterSmoking: "비흡연",
    requesterDrinking: "사회적 음주",
    requesterMbti: "ENFP",
    requesterHobbies: ["음악", "여행", "영화"],
    requesterPet: "없음",
    requesterBio: "CJ ENM에서 마케팅 일을 하고 있어요. 음악과 영화를 정말 좋아하고, 새로운 곳 여행하는 것을 즐깁니다. 밝고 유쾌한 분위기의 데이트를 좋아해요 :)",
    requesterPhotos: [
      "https://picsum.photos/seed/f1a/400/533",
      "https://picsum.photos/seed/f1b/400/533",
      "https://picsum.photos/seed/f1c/400/533",
    ],
    status: "pending",
    receivedAt: "2026-04-10T09:30:00Z",
  },
  {
    id: "r2",
    requesterId: "f2",
    requesterName: "김하늘",
    requesterAge: 29,
    requesterJob: "간호사",
    requesterCompany: "서울아산병원",
    requesterResidence: "서울 송파구",
    requesterHeight: 168,
    requesterEducation: "대졸",
    requesterSchool: "이화여자대학교",
    requesterSmoking: "비흡연",
    requesterDrinking: "안 마심",
    requesterMbti: "INFJ",
    requesterHobbies: ["독서", "요리", "헬스"],
    requesterPet: "고양이",
    requesterBio: "병원에서 일하면서 틈틈이 요리와 독서를 즐깁니다. 집에서 고양이랑 보내는 시간이 제일 행복해요. 조용하고 편안한 만남을 원합니다.",
    requesterPhotos: [
      "https://picsum.photos/seed/f2a/400/533",
      "https://picsum.photos/seed/f2b/400/533",
    ],
    status: "pending",
    receivedAt: "2026-04-09T14:00:00Z",
  },
  {
    id: "r3",
    requesterId: "f3",
    requesterName: "이유나",
    requesterAge: 31,
    requesterJob: "변호사",
    requesterCompany: "김앤장 법률사무소",
    requesterResidence: "서울 서초구",
    requesterHeight: 166,
    requesterEducation: "대학원졸",
    requesterSchool: "서울대학교",
    requesterSmoking: "비흡연",
    requesterDrinking: "사회적 음주",
    requesterMbti: "ENTJ",
    requesterHobbies: ["테니스", "골프", "여행"],
    requesterPet: "없음",
    requesterBio: "법률사무소에서 일하고 있습니다. 주말에는 테니스와 골프를 즐기며 활동적으로 생활합니다. 서로 자극이 되고 성장할 수 있는 파트너를 원합니다.",
    requesterPhotos: [
      "https://picsum.photos/seed/f3a/400/533",
      "https://picsum.photos/seed/f3b/400/533",
      "https://picsum.photos/seed/f3c/400/533",
    ],
    status: "accepted",
    receivedAt: "2026-04-08T11:00:00Z",
  },
];
