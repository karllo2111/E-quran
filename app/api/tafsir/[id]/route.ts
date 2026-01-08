import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Gunakan Promise untuk Next.js terbaru
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
        }

        const res = await fetch(`https://equran.id/api/v2/tafsir/${id}`, {
            next: { revalidate: 3600 } // Cache selama 1 jam
        });

        const result = await res.json();

        if (!res.ok || result.code !== 200) {
            return NextResponse.json({ error: "Data dari equran.id tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json(result.data);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}