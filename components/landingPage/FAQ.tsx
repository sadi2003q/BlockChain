import {getColor} from "@/lib/_colors";


type IFAQ = {
    isDarkMode: boolean;
    isVisible(
        section: string,
    ): boolean
}

export const FAQ = (
    { isDarkMode, isVisible}: IFAQ
) => {

    const colors = getColor(isDarkMode);



    return (
        <section
            className="py-20 lg:py-32"
            data-animate="faq"
            style={{ backgroundColor: colors.bg.secondary }}
        >
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${
                        isVisible('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2
                        className="text-4xl lg:text-5xl font-bold mb-6"
                        style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                    >
                        Crushing the Final Objections
                    </h2>
                    <p
                        className="text-xl"
                        style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                    >
                        The questions every security-conscious administrator asks.
                    </p>
                </div>

                <div className="space-y-6">
                    {[
                        {
                            q: 'Is it truly untraceable?',
                            a: 'Yes. We utilize cryptographic salts and zero-knowledge protocols. The link between voter ID and ballot is severed the moment "Submit" is clicked. Even if our servers were compromised, voter identities remain mathematically shielded.',
                            delay: '0ms'
                        },
                        {
                            q: 'What if someone tries to vote twice?',
                            a: 'Our role-based identity layer ensures 1-person-1-vote without ever storing how that person voted. The system verifies eligibility without connecting identity to ballot content.',
                            delay: '100ms'
                        },
                        {
                            q: 'How fast are the results?',
                            a: 'Instant. The moment your election window closes, the final report is generated and ready for admin approval. No delays, no manual counting, no waiting.',
                            delay: '200ms'
                        }
                    ].map((faq, i) => (
                        <div
                            key={i}
                            className={`p-8 rounded-2xl transition-all duration-1000 hover:scale-[1.02] ${
                                isVisible('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{
                                backgroundColor: colors.bg.card,
                                border: `1px solid ${colors.border.subtle}`,
                                transitionDelay: faq.delay
                            }}
                        >
                            <h3
                                className="text-xl font-bold mb-4 flex items-center gap-3"
                                style={{ fontFamily: "'Sora', sans-serif", color: colors.text.primary }}
                            >
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{
                                        backgroundColor: colors.accent.primary
                                    }}
                                >
                                    <span className="text-white font-bold">?</span>
                                </div>
                                {faq.q}
                            </h3>
                            <p
                                className="leading-relaxed pl-11"
                                style={{ color: colors.text.secondary, fontFamily: "'Inter', sans-serif" }}
                            >
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}