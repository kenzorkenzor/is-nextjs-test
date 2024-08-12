import { NextResponse, NextRequest } from "next/server";
import { delay } from '@/lib/utils'

export async function POST(request: NextRequest) {
    await delay(2)
    const body = await request.json()

    return NextResponse.json({
        isEcho: true,
        name: body.name ? body.name.toUpperCase() : '',
        email: body.email ? body.email.toUpperCase() : '',
    });
}
