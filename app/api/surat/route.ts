import { NextResponse } from "next/server";

export async function GET(
    _req: Request,
    { params }: { params: { nomor: string } }
){
    const {nomor} = await params;

    if(!nomor){
        return NextResponse.json(
            { error: "Nomor Surah is required"}
        );
    }

    const res = await fetch(`https://equran.id/api/v2/surat/${nomor}`);

    if(!res.ok){
        const errorData = await res.json();
        return NextResponse.json(
            { error: errorData.status_message || "Surah not found"}
        );
    }

    const data = await res.json();
    return NextResponse.json(data);

}