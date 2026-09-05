import { useEffect, useState } from "react";

import shopeeClick from "@/assets/shopee-click.png.asset.json";

const IN_APP_PATTERNS =
  /(TikTok|musical_ly|BytedanceWebview|FBAN|FBAV|FB_IAB|Instagram|Line\/|Zalo|Messenger|Twitter|Snapchat|Pinterest|MicroMessenger|KAKAOTALK)/i;

function isInAppBrowser() {
  if (typeof navigator === "undefined") return false;
  return IN_APP_PATTERNS.test(navigator.userAgent);
}

function isAndroid() {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

export function ShopeeGate({ onUnlock, url }: { onUnlock: () => void; url: string }) {
  const shopeeUrl = url;
  const [inApp, setInApp] = useState(false);
  const [android, setAndroid] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setInApp(isInAppBrowser());
    setAndroid(isAndroid());
  }, []);

  const openExternally = () => {
    if (android) {
      // Ép mở bằng Chrome trên Android thay vì webview trong app
      const clean = shopeeUrl.replace(/^https?:\/\//, "");
      const intentUrl = `intent://${clean}#Intent;scheme=https;action=android.intent.action.VIEW;package=com.android.chrome;end`;
      window.location.href = intentUrl;
      onUnlock();
      return;
    }
    window.open(shopeeUrl, "_blank", "noopener,noreferrer");
    onUnlock();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shopeeUrl);
    } catch {
      const el = document.createElement("textarea");
      el.value = shopeeUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    onUnlock();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="pastel-panel mt-4 p-5 text-center sm:p-8">
      <p className="text-base font-semibold">Cảm ơn Quý độc giả đã ủng hộ!</p>
      <p className="mt-3 text-sm sm:text-base">
        Tiếp tục ủng hộ <strong>Trạm Mochi Mochi</strong> bằng cách <strong>CLICK</strong> vào{" "}
        <strong>LIÊN KẾT HOẶC ẢNH</strong> bên dưới, sau đó quay trở lại để tiếp tục đọc toàn bộ
        chương truyện!
      </p>


      {inApp && (
        <div className="mt-4 rounded-2xl border border-border bg-secondary p-4 text-left text-sm text-secondary-foreground">
          <p className="font-bold">Bạn đang xem trong ứng dụng (TikTok/Facebook…)</p>
          <p className="mt-1">
            Link mở trong ứng dụng sẽ không ghi nhận được. Hãy bấm{" "}
            <strong>Sao chép liên kết</strong> rồi dán vào <strong>Chrome</strong> hoặc{" "}
            <strong>Safari</strong>, hoặc bấm nút <strong>“…”</strong> ở góc màn hình và chọn{" "}
            <strong>Mở bằng trình duyệt</strong>.
          </p>
          <button
            type="button"
            onClick={copyLink}
            className="mt-3 w-full rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
          >
            {copied ? "Đã sao chép liên kết!" : "Sao chép liên kết"}
          </button>
        </div>
      )}

      <a
        href={shopeeUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        onClick={(e) => {
          if (android || inApp) e.preventDefault();
          if (android) return openExternally();
          onUnlock();
        }}
        className="mt-4 block w-full break-all font-bold text-accent-foreground underline underline-offset-4"
      >
        {shopeeUrl}
      </a>

      <a
        href={shopeeUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        onClick={(e) => {
          if (android) {
            e.preventDefault();
            return openExternally();
          }
          onUnlock();
        }}
        className="mx-auto mt-5 block w-full max-w-sm overflow-hidden rounded-2xl border border-border transition hover:opacity-90"
      >
        <img
          src={shopeeClick.url}
          alt="Ấn vào đây để đọc toàn bộ chương truyện"
          className="block w-full"
          loading="lazy"
        />
      </a>

      <p className="mt-5 font-bold text-primary">
        Trạm Mochi Mochi và đội ngũ Editor xin chân thành cảm ơn!
      </p>
    </div>
  );
}
