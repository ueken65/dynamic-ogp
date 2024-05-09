import fs from "fs";
import path from "path";
import { createCanvas, registerFont, loadImage } from "canvas";

const current = process.cwd();

export const generateOgImage = async (title: string): Promise<Buffer> => {
  // font を登録
  const font = path.resolve(
    current,
    "src/lib/canvas/assets/NotoSansJP-Bold.ttf"
  );
  registerFont(font, { family: "NotoSansJP" });

  // canvas を作成
  const width = 400;
  const height = 250;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // 元になる画像を読み込む
  const src = path.resolve(current, "src/lib/canvas/assets/og-image.png");
  const image = await loadImage(fs.readFileSync(src));

  // 元の画像を canvas にセットする
  ctx.drawImage(image, 0, 0, width, height);

  // タイトルの style
  ctx.font = '28px "NotoSansJP"';
  ctx.textAlign = "center";

  // タイトルを元の画像にセットする
  const maxWidth = 400;
  const w = width / 2;
  const write = (text: string, h: number) => {
    ctx.fillText(text, w, h, maxWidth);
  };

  write(title, 30);

  return canvas.toBuffer("image/png");
};
