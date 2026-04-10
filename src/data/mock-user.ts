export const mockUser = {
  id: "me",
  name: "박서연",
  birthYear: 1998,
  age: 28,
  gender: "female" as const,
  height: 165,
  education: "대졸",
  school: "연세대학교",
  company: "미래에셋자산운용",
  jobTitle: "펀드매니저",
  residence: "서울 강남구",
  smoking: "비흡연",
  drinking: "사회적 음주",
  mbti: "ENTJ",
  hobbies: ["테니스", "독서", "여행", "헬스"],
  pet: "없음",
  bio: "미래에셋에서 펀드매니저로 일하고 있습니다. 테니스와 독서를 즐기며 바쁘지만 충실한 일상을 보내고 있어요. 함께 대화하며 서로 성장할 수 있는 분을 만나고 싶습니다.",
  photos: [
    "https://picsum.photos/seed/mea/400/533",
    "https://picsum.photos/seed/meb/400/533",
    "https://picsum.photos/seed/mec/400/533",
  ],
};

export type MockUser = typeof mockUser;
