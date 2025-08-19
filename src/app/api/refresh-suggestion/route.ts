import {GoogleGenAI} from '@google/genai';
import {NextResponse} from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export async function GET() {
    const prompt = `
        # 命令
        作業の合間に出来る簡単なリフレッシュ方法を一つ提案してください。

        # 制約事項
        - 1~2分程度で出来ること
        - 室内で出来ること
        - 体を動かすこと
        - 絵文字を一つ含めること
        - 簡潔に一文の中に収めること
        - 「~しよう」のように提案する形で終わること

        # 出力例
        - 室内で少し歩こう🚶
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-001',
        contents: prompt,
    });

    return NextResponse.json({suggestion: response.text}, {status: 200});
}