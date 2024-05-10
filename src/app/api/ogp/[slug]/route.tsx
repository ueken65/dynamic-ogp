import { ImageResponse } from "next/og";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const now = Date.now().toString();

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <p>{params.slug}</p>
        <p>{now}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
