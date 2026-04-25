import { getSupabaseClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Suggestion {
  id: string;
  itemText: string;
  category: string;
  period: string;
  suggestion: string;
  timestamp: number;
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("suggestions")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Omit<Suggestion, "id">;
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("suggestions")
      .insert([
        {
          ...body,
          id: Date.now().toString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Önersi kaydedilemedi" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, suggestion } = (await request.json()) as {
      id: string;
      suggestion: string;
    };

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("suggestions")
      .update({ suggestion })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Önersi güncellenemedi" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await request.json()) as { id: string };

    const supabase = getSupabaseClient();
    const { error } = await supabase.from("suggestions").delete().eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Önersi silinemedi" },
      { status: 500 }
    );
  }
}
