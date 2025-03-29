import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle, AlertTriangle } from "lucide-react";

const TranscriptionResult = ({ data }) => {
    if (!data) return null;

    const { transcription, analysis } = data;

    const sentimentData = [
        { name: "Fear", value: analysis.sentiments.fear * 100 },
        { name: "Confidence", value: analysis.sentiments.confidence * 100 },
        { name: "Nervousness", value: analysis.sentiments.nervousness * 100 },
    ];

    return (
        <div className="w-full mx-auto p-6 bg-gray-900 text-white shadow-xl">

            <h2 className="text-2xl font-bold mb-4 text-center text-neon-blue">📝 Transcription</h2>
            <p className="text-lg bg-neon-blue p-4 rounded-lg border border-gray-700 shadow-md text-black">{transcription}</p>

            <h2 className="text-2xl font-bold mt-6 mb-4 text-center text-purple-500">📊 Sentiment Analysis</h2>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sentimentData}>
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip wrapperStyle={{ backgroundColor: "#222", borderRadius: "8px" }} />
                    <Bar dataKey="value" fill="cyan" barSize={30} radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>

            <h2 className="text-2xl font-bold mt-6 mb-4 text-center text-yellow-400">🔍 Grammar Suggestions</h2>
            <div className="space-y-4">
                {Array.isArray(analysis.grammar) ? (
                    analysis.grammar.length > 0 ? (
                        analysis.grammar.map((issue, index) => (
                            <div key={index} className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
                                <p className="text-red-400 font-bold flex items-center">
                                    <AlertTriangle className="mr-2" /> {issue.error}
                                </p>
                                <p className="text-gray-300 italic">{issue.description}</p>
                                <p className="text-green-300 font-semibold mt-2">💡 Suggestion: {issue.suggestion}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-green-400 flex items-center">
                            <CheckCircle className="mr-2" /> No Grammar Issues Found! ✅
                        </p>
                    )
                ) : (
                    <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
                        <p className="text-gray-300 italic">{analysis.grammar}</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default TranscriptionResult;
