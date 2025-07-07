"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const chartData = [
    { level: "Antes", Produtividade: 45, Foco: 40 },
    { level: "Depois", Produtividade: 90, Foco: 85 },
]

const chartConfig = {
    Produtividade: {
        label: "Produtividade",
        color: "hsl(var(--primary))",
    },
    Foco: {
        label: "Foco",
        color: "hsl(var(--accent))",
    },
}

export function ProductivityChart() {
    return (
        <Card className="w-full border-secondary bg-secondary/30">
            <CardHeader>
                <CardTitle>Sua Transformação Potencial</CardTitle>
                <CardDescription>Ganhos de produtividade e foco com o programa completo.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-48 w-full">
                    <ResponsiveContainer>
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{ top: 20, right: 0, left: -14, bottom: 0 }}
                        >
                            <XAxis
                                dataKey="level"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                            />
                            <YAxis
                                stroke="hsl(var(--muted-foreground))"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                unit="%"
                                fontSize={12}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Bar dataKey="Produtividade" fill="var(--color-Produtividade)" radius={4} />
                            <Bar dataKey="Foco" fill="var(--color-Foco)" radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
