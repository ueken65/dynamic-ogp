import { ImageResponse } from "next/og";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {params.slug}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
