# Microbial EVs 課堂問答（GitHub Pages + Firebase 版）

把原本跑在筆電上的 `mev-classroom`（Python + SQLite + Cloudflare 臨時網址）改成永久網址版：
學生網址固定、QR code 不用每次重印、電腦關了資料也在。

| | 本機版 | 這個版本 |
|---|---|---|
| 學生網址 | 每次啟動都變（Cloudflare 臨時網址） | 固定 `https://tsaipj.github.io/mev-classroom/` |
| 上課前 | 要開終端機、保持電腦喚醒 | 開教師頁登入即可，手機平板都行 |
| 資料 | 電腦裡的 `answers.sqlite3` | Firestore（專案 `class-checkin-fc873`） |
| 即時更新 | 每 2 秒輪詢 | Firestore 即時推播，按下去馬上動 |
| 正解 | 在伺服器端 | 存在只有教師讀得到的 Firestore 文件 |

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 學生端（掃 QR code 進來的頁面） |
| `teacher.html` | 教師控制台（選題、開放作答、即時結果、文字雲、CSV） |
| `setup.html` | 一次性：把正解寫進 Firestore。用完請從 repo 刪除 |
| `questions.js` | 題庫（不含正解）。要改題目改這裡 |
| `firebase-config.js` | Firebase 設定與房間代號 |
| `app.css` | 樣式 |
| `firestore.rules.txt` | 要加進 Firebase 安全規則的片段 |

## 建置步驟（約 15 分鐘，只做一次）

**1. 填好 `firebase-config.js`** ✅ 已完成（2026-09-20）
Firebase 專案 `class-checkin-fc873` 的設定值已填入。要換班級只需改 `MEV_ROOM_ID`。

**2. 確認 Authentication** ✅ 已確認：匿名、電子郵件/密碼皆已啟用。

**3. 更新 Firestore 安全規則** ✅ 已發布（2026-09-20）
`match /mevQuiz/{room}` 區塊已加入專案規則，沿用原有的 `isTeacher()`（以 email/password 登入者為教師），
課堂簽到簿原本的規則完整保留。`firestore.rules.txt` 留作參考。

**4. 建 GitHub repo 並開啟 Pages** ✅ 已完成
Repo：`TsaiPJ/mev-classroom`（public）；Pages：main 分支 `/ (root)`。
網址：`https://tsaipj.github.io/mev-classroom/`

**5. 匯入正解，然後刪掉 setup.html** ⬅️ 只剩這一步（需要教師密碼，請自行操作）
開 `https://tsaipj.github.io/mev-classroom/setup.html` → 用教師帳號登入 → 按「寫入正解」→
看到 ✅ 之後，把 `setup.html` 從 repo 刪除。正解從此只存在 Firestore 的教師專屬位置。

**6. 測試**
教師頁 `https://tsaipj.github.io/mev-classroom/teacher.html` 登入 → 開放 `課前 1`，
用手機掃 QR code 進學生頁，輸入學號姓名作答，確認教師頁長條圖有跳動。

## 上課流程

1. 投影教師頁的 QR code（**教師頁網址不要投影**，那是控制台）。
2. 同學掃碼 → 輸入學號姓名 → 等老師開題。
3. 教師頁選題、設定秒數（10–600）、按「開放作答」；時間到自動截止，也可按「立即截止」。
4. 前測 5 題是非 + 1 題文字雲；後測 5 題單選 + 1 題文字雲。每人每題只能送出一次。
5. 課後在教師頁下載「成績 CSV」「逐題答案 CSV」，文字雲可存 PNG。

## 日常維護

- **換班級／換學年**：改 `firebase-config.js` 裡的 `MEV_ROOM_ID`（例如 `mev2027`），
  資料自動分開存，舊資料不會被蓋掉，也不用刪任何東西。
- **改題目**：編輯 `questions.js`。若改到選擇題的正確選項，把 `setup.html` 放回 repo，
  更新裡面的 `ANSWER_KEY` 後再執行一次，然後再刪掉。
- **換課**：改 `MEV_COURSE_TITLE` / `MEV_COURSE_SUBTITLE`，題庫換掉即可重複使用。

## 安全性說明

- 學生是匿名登入；規則只允許他們在「該題開放中且未逾時」時寫入自己那一筆答案，
  文件 ID 固定為 `學號__題號`，所以無法重複作答、無法改別人的答案、也讀不到別人的答案。
- 正解存在 `mevQuiz/{room}/meta/key`，規則限定只有教師 Email 讀得到，學生端程式碼裡沒有正解。
- 教師頁只是頁面沒有秘密可言，真正的把關在 Firestore 規則：沒有教師帳號就什麼都改不了。
- 唯一要注意的是**不要把 `setup.html` 留在 repo 裡**，那個檔案含有正解。
