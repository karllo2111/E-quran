import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Gunakan Promise untuk versi terbaru
) {
    try {
        const { id } = await params;
        const res = await fetch(`https://equran.id/api/v2/surat/${id}`);

        if (!res.ok) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        }

        const result = await res.json();
        return NextResponse.json(result.data); // Ambil field .data sesuai JSON output tadi
    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}