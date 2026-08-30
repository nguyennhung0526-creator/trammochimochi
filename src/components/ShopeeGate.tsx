import shopeeClick from "@/assets/shopee-click.png.asset.json";

const DEFAULT_SHOPEE_URL = "https://spf.shopee.vn/16cHicV6W";

export function ShopeeGate({ onUnlock, url }: { onUnlock: () => void; url?: string }) {
  const shopeeUrl = url ?? DEFAULT_SHOPEE_URL;
  const handleClick = () => {
    window.open(shopeeUrl, "_blank", "noopener,noreferrer");
    onUnlock();
  };

  return (
    <div className="pastel-panel mt-4 p-5 text-center sm:p-8">
      <p className="text-base font-semibold">Cảm ơn Quý độc giả đã ủng hộ!</p>
      <p className="mt-3 text-sm sm:text-base">
        Tiếp tục ủng hộ <strong>Trạm Mochi Mochi</strong> bằng cách <strong>CLICK</strong> vào{" "}
        <strong>LIÊN KẾT HOẶC ẢNH</strong> bên dưới
      </p>
      <p className="mt-3 text-sm sm:text-base">
        <span className="font-bold text-destructive">MỞ ỨNG DỤNG SHOPEE</span>, sau đó quay trở lại
        để tiếp tục đọc toàn bộ chương truyện!
      </p>
      <button
        type="button"
        onClick={handleClick}
        className="mt-4 block w-full break-all font-bold text-accent-foreground underline underline-offset-4"
      >
        {shopeeUrl}
      </button>

      <button
        type="button"
        onClick={handleClick}
        className="mx-auto mt-5 block w-full max-w-sm overflow-hidden rounded-2xl border border-border transition hover:opacity-90"
      >
        <img
          src={shopeeClick.url}
          alt="Ấn vào đây để đọc toàn bộ chương truyện"
          className="block w-full"
          loading="lazy"
        />
      </button>

      <p className="mt-5 font-bold text-primary">
        Trạm Mochi Mochi và đội ngũ Editor xin chân thành cảm ơn!
      </p>
    </div>
  );
}
