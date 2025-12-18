export const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black uppercase text-black dark:text-white mb-4">Contact Us</h1>
                <div className="h-2 w-24 bg-black dark:bg-white mx-auto"></div>
            </div>

            <div className="bg-white dark:bg-gray-900 border-4 border-black dark:border-gray-600 comic-shadow p-8 flex flex-col items-center space-y-8">

                <p className="font-mono text-center text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
                    Have questions, suggestions, or just want to say hi? <br />
                    Reach out to us through the channels below.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">

                    {/* Email Card */}
                    <a href="mailto:nandisubhradip01@gmail.com" className="group">
                        <div className="bg-yellow-400 border-4 border-black p-6 flex flex-col items-center justify-center gap-4 transition-transform hover:-translate-y-2 hover:shadow-none comic-shadow cursor-pointer h-full">
                            <div className="text-4xl bg-white border-2 border-black rounded-full w-16 h-16 flex items-center justify-center">
                                📧
                            </div>
                            <div className="text-center">
                                <h3 className="font-black text-black uppercase text-xl">Email</h3>
                                <p className="font-mono text-sm font-bold mt-1 text-gray-800 break-all">nandisubhradip01@gmail.com</p>
                            </div>
                        </div>
                    </a>

                    {/* Github Card */}
                    <a href="https://github.com/codingplugin" target="_blank" rel="noopener noreferrer" className="group">
                        <div className="bg-black text-white border-4 border-black dark:border-gray-600 p-6 flex flex-col items-center justify-center gap-4 transition-transform hover:-translate-y-2 hover:shadow-none comic-shadow cursor-pointer h-full">
                            <div className="text-4xl bg-white text-black border-2 border-black rounded-full w-16 h-16 flex items-center justify-center">
                                🐙
                            </div>
                            <div className="text-center">
                                <h3 className="font-black uppercase text-xl text-white">GitHub</h3>
                                <p className="font-mono text-sm font-bold mt-1 text-gray-400">@codingplugin</p>
                            </div>
                        </div>
                    </a>

                </div>

            </div>
        </div>
    );
};
