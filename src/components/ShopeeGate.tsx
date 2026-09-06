import shopeeClick from "@/assets/shopee-click.png.asset.json";

/**
 * Cổng bắt buộc: người đọc phải bấm link Shopee (mở thẳng app Shopee
 * qua universal link) thì mới mở khóa nội dung chương.
 */
export function ShopeeGate({ onUnlock, url }: { onUnlock: () => void; url: string }) {
  const shopeeUrl = url;

  const openShopee = () => {
    // Mở trong tab mới — trên điện thoại, link Shopee sẽ tự chuyển sang app Shopee.
    window.open(shopeeUrl, "_blank", "noopener,noreferrer");
    onUnlock();
  };

  return (
    <div className="pastel-panel mt-4 p-5 text-center sm:p-8">
      <p className="text-base font-semibold">Cảm ơn Quý độc giả đã ủng hộ!</p>
      <p className="mt-3 text-sm sm:text-base">
        Tiếp tục ủng hộ <strong>Trạm Mochi Mochi</strong> bằng cách <strong>CLICK</strong> vào{" "}
        <strong>LIÊN KẾT HOẶC ẢNH</strong> bên dưới, sau đó quay trở lại để tiếp tục đọc toàn bộ
        chương truyện!
      </p>

      <button
        type="button"
        onClick={openShopee}
        className="mt-4 block w-full break-all font-bold text-accent-foreground underline underline-offset-4"
      >
        {shopeeUrl}
      </button>

      <button
        type="button"
        onClick={openShopee}
        className="mx-auto mt-5 block w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/15 via-lilac/15 to-butter/15 p-2 shadow-card transition hover:opacity-90"
        aria-label="Ấn vào đây để mở Shopee và đọc toàn bộ chương truyện"
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
