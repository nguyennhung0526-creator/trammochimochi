import shopeeClick from "@/assets/shopee-click.png.asset.json";

/**
 * Cổng bắt buộc: người đọc phải bấm link Shopee (mở thẳng app Shopee
 * qua universal link) thì mới mở khóa nội dung chương.
 */
export function ShopeeGate({ onUnlock, url }: { onUnlock: () => void; url: string }) {
  const shopeeUrl = url;

  const openShopee = () => {
    onUnlock();
    // Thử mở thẳng app Shopee đã đăng nhập bằng Custom URL Scheme
    // (shopee://...) — hoạt động cả trong webview TikTok nơi link https
    // thường bị kẹt. Nếu sau 1.2s app không bật (máy chưa cài Shopee),
    // tự chuyển sang đường dẫn web HTTPS mặc định.
    const schemeUrl = shopeeUrl.replace(/^https?:\/\//, "shopee://");
    const start = Date.now();
    const fallback = window.setTimeout(() => {
      // Trang vẫn hiển thị => app không mở được => mở bản web
      if (Date.now() - start < 2000) window.location.assign(shopeeUrl);
    }, 1200);
    const cancel = () => window.clearTimeout(fallback);
    window.addEventListener("pagehide", cancel, { once: true });
    document.addEventListener("visibilitychange", cancel, { once: true });
    window.location.assign(schemeUrl);
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
