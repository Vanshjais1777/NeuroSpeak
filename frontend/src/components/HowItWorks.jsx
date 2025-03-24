import { motion } from "framer-motion";

const HowItWorks = () => {
    return (
        <div className="relative bg-black text-white px-6 md:px-12 lg:px-20 min-h-screen flex flex-col items-center">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px">
                {[...Array(72)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-800 opacity-25 w-full h-full"
                    ></div>
                ))}
            </div>
            <div className="absolute inset-0 bg-[color:var(--color-neon-blue)] opacity-10 blur-2xl"></div>

            <h2 className="text-4xl font-bold text-center mb-12">
                How <span className="text-neon-blue">NeuroSpeak</span> Works
            </h2>

            <div className="relative w-full max-w-4xl">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-neon-blue opacity-50"></div>

                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        {/* Connecting Line Dots */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-neon-blue rounded-full border-4 border-gray-900 animate-pulse"></div>

                        {/* Content Box */}
                        <div className="w-5/12 lg:p-6 md:p-4 p-2 text-sm md:text-md lg:text-lg bg-gray-800 rounded-xl shadow-lg text-center hover:scale-105 transition-transform border-2 border-blue-500">
                            <div className="text-5xl mb-4 text-neon-blue">{step.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-300">{step.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const steps = [
    { icon: "🎥", title: "Live Mode", description: "Start talking in the front of the camera Like Someone is watching you" },
    { icon: "🧠", title: "AI Analysis", description: "AI will analyse facial expressions, sentiment, Tone, Grammer and emotions in your Video" },
    { icon: "⚡", title: "Instant AI Feedback", description: "Improve confidence, clarity, tone, expressions and fluency by the help of live AI feedback" },
    { icon: "📊", title: "Track Your Progress", description: "View your analytics in Dashboard and monitor your growth of Communication" },
];

export default HowItWorks;
