import { NextResponse } from "next/server"

function GET(): NextResponse {
    return NextResponse.json({ status: "ok" })
}

export { GET }
