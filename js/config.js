/**
 * サイト内の外部リンクは、このファイルだけで管理します。
 *
 * purchaseUrl を https:// で始まる購入ページURLに変更すると、
 * ページ内の「マスカットを購入する」がすべてそのURLへ遷移します。
 *
 * 購入ページを確認できていないあいだは、URLを推測して書かないでください。
 * TODO_PURCHASE_URL のままのとき、購入ボタンは確認済みの Instagram を開きます。
 * （2026年7月22日の投稿では、注文方法として DM が案内されていました）
 */
const siteConfig = {
  purchaseUrl: "TODO_PURCHASE_URL",
  instagramUrl: "https://www.instagram.com/white_muscat/"
};
