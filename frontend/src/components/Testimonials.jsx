import { motion } from "framer-motion";

const testimonials = [
    {
        text: "This AI tool helped me become a more confident speaker in just a few weeks!",
        name: "Alex Johnson",
    },
    {
        text: "The facial expression analysis gave me great insights into my nervous habits.",
        name: "Sophia Lee",
    },
    {
        text: "NeuroSpeak has transformed the way I practice public speaking!",
        name: "Michael Smith",
    },
];

const Testimonials = () => {
    return (
        <div className="relative bg-black text-white py-20 px-6 md:px-12 lg:px-20 flex flex-col items-center">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px">
                {[...Array(72)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-800 opacity-25 w-full h-full"
                    ></div>
                ))}
            </div>
            <div className="absolute inset-0 bg-[color:var(--color-neon-blue)] opacity-10 blur-3xl"></div>
            {/* Section Heading */}
            <h2 className="text-4xl font-bold text-center mb-12">
                What Our <span className="text-neon-blue">Users Say</span>
            </h2>

            {/* Testimonial Cards */}
            <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        className="relative p-6 bg-gray-800 text-white rounded-xl shadow-lg text-center 
                                   transform transition-all duration-300 hover:scale-105 border-2 border-blue-500"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        {/* Floating Neon Glow */}
                        <div className="absolute inset-0 bg-neon-blue opacity-7 blur-2xl rounded-xl"></div>

                        {/* Testimonial Content */}
                        <p className="text-lg italic text-gray-300">"{testimonial.text}"</p>
                        <h3 className="mt-4 text-xl font-semibold text-neon-blue">{testimonial.name}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
