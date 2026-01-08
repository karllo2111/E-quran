import { NextResponse } from "next/server";

export async function GET(){
    const res = await fetch(`https://equran.id/api/v2/surat`);

    if(!res.ok){
        const errorData = await res.json();
        return NextResponse.json(
            { error: errorData.status_message || "Surah not found"}
        );
    }

    const data = await res.json();
    return NextResponse.json(data);

}