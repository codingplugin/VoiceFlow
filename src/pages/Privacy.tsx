export const Privacy = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black uppercase text-black dark:text-white mb-4">Privacy Policy</h1>
                <div className="h-2 w-24 bg-black dark:bg-white mx-auto"></div>
            </div>

            <div className="bg-white dark:bg-gray-900 border-4 border-black dark:border-gray-600 comic-shadow p-8 space-y-6 text-gray-800 dark:text-gray-200 font-mono">

                <section>
                    <h2 className="text-2xl font-bold uppercase mb-2">1. Introduction</h2>
                    <p>
                        Welcome to VoiceFlow. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website
                        and tell you about your privacy rights and how the law protects you.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold uppercase mb-2">2. Data We Collect</h2>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li><strong>Audio Data:</strong> Voice recordings you upload or record for processing. these are processed by Deepgram and are not permanently stored by us.</li>
                        <li><strong>Text Data:</strong> Text you input for speech synthesis.</li>
                        <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold uppercase mb-2">3. How We Use Your Data</h2>
                    <p>
                        We use your data primarily to provide the services you request (Speech-to-Text and Text-to-Speech).
                        We do not sell your data to third parties. We utilize third-party APIs (specifically Deepgram) to process your audio and text.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold uppercase mb-2">4. Data Security</h2>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold uppercase mb-2">5. Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us via the Contact page.
                    </p>
                </section>

            </div>
        </div>
    );
};
