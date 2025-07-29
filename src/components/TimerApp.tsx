'use client';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import Controls from "./Controls";

export default function TimerApp() {
    // タイマーの実行状態を管理するstate
    const [isRunning, setIsRunning] = useState(false);

    // タイマーの残り時間を管理するstate
    const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 3 });

    // 開始・停止ボタンのハンドラ
    const handleStart = () => {
        setIsRunning(!isRunning);
    }

    // リセットボタンのハンドラ
    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft({ minutes: 25, seconds: 0 });
    }

    useEffect(() => {
        // setIntervalの戻り値（タイマーID）を保持する変数
        let intervalId: NodeJS.Timeout;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTimeLeft((prev) => {
                    // 秒数が0の場合
                    if(prev.seconds === 0) {
                        // 分数が0の場合はタイマー終了
                        if(prev.minutes === 0) {
                            setIsRunning(false);
                            return prev;
                        }
                        
                        // 分数がまだ残っている場合は、分数を1減らし、秒数を59に設定
                        return { minutes: prev.minutes - 1, seconds: 59 };
                    }

                    // 秒数が1以上の場合は、秒数を1減らす
                    return { ...prev, seconds: prev.seconds - 1 };
                });
            }, 1000);
        };

        // クリーンアップ関数
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, [isRunning]);

    return(
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">作業時間</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    <TimerDisplay 
                        minutes={timeLeft.minutes} 
                        seconds={timeLeft.seconds} 
                    />
                    <Controls
                        onStart={handleStart}
                        onReset={handleReset}
                        isRunning={isRunning}
                    />
                </CardContent>
            </Card>
        </div>
    )
}