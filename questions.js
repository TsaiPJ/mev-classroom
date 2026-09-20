// Microbial EVs 課堂問答：題庫（學生端可見，不含正解）
// 要改題目，直接編輯這個檔案即可。正解存在 Firestore 的 mevQuiz/{room}/meta/key，只有教師讀得到。
// 注意：若調整選項順序，記得同步更新 Firestore 裡的正解索引。
window.MEV_QUESTIONS = [
  { id: "pre1", phase: "pre", type: "choice", text: "Microbial EVs 是微生物釋放、具有膜結構的微小顆粒。", options: ["錯", "對"] },
  { id: "pre2", phase: "pre", type: "choice", text: "只有革蘭氏陰性菌會釋放 EVs。", options: ["錯", "對"] },
  { id: "pre3", phase: "pre", type: "choice", text: "Microbial EVs 可以攜帶蛋白質、脂質或核酸。", options: ["錯", "對"] },
  { id: "pre4", phase: "pre", type: "choice", text: "所有 microbial EVs 都會傷害宿主。", options: ["錯", "對"] },
  { id: "pre5", phase: "pre", type: "choice", text: "只要測到奈米顆粒，就能證明宿主反應是 EVs 造成的。", options: ["錯", "對"] },
  { id: "pre_word", phase: "pre", type: "word", text: "想到「microbial EVs 如何影響宿主」，你首先想到哪一個關鍵詞？" },
  { id: "post1", phase: "post", type: "choice", text: "革蘭氏陰性菌的 outer membrane vesicles（OMVs）主要與哪個構造有關？", options: ["粒線體", "宿主細胞膜", "外膜", "細胞核"] },
  { id: "post2", phase: "post", type: "choice", text: "MEV 的內容物與來源微生物相比，哪項敘述最合理？", options: ["EVs 只能裝入水", "培養條件不會影響內容物", "所有分子的比例必定相同", "某些分子可能被選擇性富集"] },
  { id: "post3", phase: "post", type: "choice", text: "為什麼不同 MEVs 可能對宿主產生相反的影響？", options: ["所有 MEVs 的作用相同", "只取決於顆粒大小", "只取決於微生物是否能移動", "取決於來源、內容物、接受細胞及環境"] },
  { id: "post4", phase: "post", type: "choice", text: "純化的 EV 樣本使宿主細胞發炎，哪項做法最能加強因果證據？", options: ["只測量顆粒數", "檢查純度並加入排除游離成分的對照組", "只增加 EV 劑量", "只拍攝更多顯微鏡照片"] },
  { id: "post5", phase: "post", type: "choice", text: "將 MEVs 開發為產品時，哪組資訊最需要保持可測量且一致？", options: ["簡報字型", "只要知道微生物名稱即可", "顏色與照片亮度", "來源菌株、顆粒特性、活性、安全性及批次品質"] },
  { id: "post_word", phase: "post", type: "word", text: "想到「microbial EVs 如何影響宿主」，你首先想到哪一個關鍵詞？" },
];
window.MEV_BY_ID = Object.fromEntries(window.MEV_QUESTIONS.map(q => [q.id, q]));
