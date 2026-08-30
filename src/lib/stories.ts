import cover1 from "@/assets/cover-1.jpg";
import cover2 from "@/assets/cover-2.jpg";
import cover3 from "@/assets/cover-3.jpg";
import cover4 from "@/assets/cover-4.jpg";

export type Chapter = {
  index: number;
  title: string;
  paragraphs: string[];
};

export type Story = {
  slug: string;
  title: string;
  author: string;
  translator: string;
  status: "Hoàn Thành" | "Đang ra" | "Chờ full";
  views: number;
  cover: string;
  tags: string[];
  summary: string;
  chapters: Chapter[];
  hot?: boolean;
};

const lorem = (title: string): Chapter[] =>
  Array.from({ length: 4 }, (_, i) => ({
    index: i + 1,
    title: `Chương ${i + 1}`,
    paragraphs: [
      `${title} — Chương ${i + 1}. Mùa hạ năm ấy, tiếng ve rơi đầy trên con đường nhỏ dẫn về ký túc xá, nàng ngồi bên bậc thềm đá, tay giữ chặt lá thư chưa kịp gửi.`,
      "Gió chiều lùa qua giàn hoa giấy, mang theo mùi mưa mới. Có những điều người ta chỉ dám nói khi biết chắc rằng người kia sẽ không bao giờ nghe thấy.",
      "“Chi bằng không gặp,” nàng thì thầm, rồi mỉm cười. Nhưng trái tim vẫn cứ ngoan cố đập nhanh hơn một nhịp mỗi khi bóng người ấy đi ngang cửa lớp.",
      "Đêm đó, thành phố sáng đèn như một chiếc vòng quay khổng lồ, chậm rãi quay giữa những giấc mơ còn chưa kịp đặt tên. Và câu chuyện của họ, mới chỉ vừa bắt đầu.",
    ],
  }));

export const stories: Story[] = [
  {
    slug: "chi-bang-khong-gap",
    title: "Chi Bằng Không Gặp",
    author: "Khuyết Danh",
    translator: "Admin đang cập nhật",
    status: "Hoàn Thành",
    views: 16251,
    cover: cover2,
    tags: ["Ngôn Tình", "BE", "Hiện Đại", "Ngược Tâm", "SE", "Tra Nam"],
    summary:
      "Nếu biết trước kết cục sẽ là chia ly, liệu chúng ta có còn dũng cảm gặp nhau lần đầu? Một câu chuyện dịu dàng và day dứt về tuổi trẻ, về những lời chưa nói và những chuyến tàu đã đi.",
    chapters: lorem("Chi Bằng Không Gặp"),
    hot: true,
  },
  {
    slug: "tinh-yeu-em-danh-cho-anh-da-het-han",
    title: "Tình Yêu Em Dành Cho Anh Đã Hết Hạn",
    author: "Mộc Hạ",
    translator: "Mochi Team",
    status: "Hoàn Thành",
    views: 12480,
    cover: cover3,
    tags: ["Ngôn Tình", "Hiện Đại", "Ngọt Sủng", "HE"],
    summary:
      "Em đã yêu anh suốt bảy năm. Đến năm thứ tám, em quyết định gói tình yêu ấy lại, dán nhãn hết hạn, rồi bước đi thật nhẹ.",
    chapters: lorem("Tình Yêu Em Dành Cho Anh Đã Hết Hạn"),
    hot: true,
  },
  {
    slug: "hoa-anh-dao-thang-tu",
    title: "Hoa Anh Đào Tháng Tư",
    author: "Lam Thư",
    translator: "Mochi Team",
    status: "Đang ra",
    views: 9310,
    cover: cover1,
    tags: ["Ngôn Tình", "Thanh Xuân Vườn Trường", "Ngọt", "HE"],
    summary:
      "Tháng tư, hoa anh đào rơi trên vai cậu bạn cùng bàn. Cô gái nhút nhát ấy đã giữ bí mật này suốt ba năm học.",
    chapters: lorem("Hoa Anh Đào Tháng Tư"),
  },
  {
    slug: "ho-sen-duoi-anh-trang",
    title: "Hồ Sen Dưới Ánh Trăng",
    author: "Thanh Vân",
    translator: "Admin đang cập nhật",
    status: "Chờ full",
    views: 7602,
    cover: cover4,
    tags: ["Cổ Đại", "Tiên Hiệp", "Huyền Huyễn", "Ngược Tâm"],
    summary:
      "Một đêm rằm, sen nở giữa hồ tiên. Nàng bước ra từ ánh trăng, mang theo lời hứa của một kiếp trước chưa trọn.",
    chapters: lorem("Hồ Sen Dưới Ánh Trăng"),
    hot: true,
  },
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);

export const navItems = [
  { label: "Trang chủ", to: "/" },
  { label: "Ngôn Tình", to: "/the-loai/ngon-tinh" },
  { label: "Truyện hoàn thành", to: "/danh-sach/hoan-thanh" },
  { label: "Truyện chờ full", to: "/danh-sach/cho-full" },
  { label: "Truyện hot", to: "/danh-sach/hot" },
] as const;
