import Navbar from "../reusables/Navbar";

const Home = () => {
    return (

        <div className="bg-gray-50 flex flex-col items-center py-10 px-6">
            {/* Header */}
            <header className="text-center max-w-3xl">
                <h1 className="text-4xl font-bold text-blue-700 mb-4">
                    Salesync – Smart Proofing for Sellers
                </h1>
                <p className="text-lg text-gray-600">
                    Protect your business with automatic packaging video proof.
                </p>
            </header>

            {/* Features */}
            <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                <div className="p-6 bg-white rounded-2xl shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        📦 Multi-Platform Support
                    </h3>
                    <p className="text-gray-600">
                        Choose your source – Flipkart, Meesho, or your personal website.
                    </p>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        🎥 Automatic Video Proofing
                    </h3>
                    <p className="text-gray-600">
                        Start recording instantly when scanning an order barcode.
                        Videos are auto-saved with Order ID and Date.
                    </p>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        🔍 Duplicate Check
                    </h3>
                    <p className="text-gray-600">
                        Detects duplicate order scans and lets you review or overwrite recordings.
                    </p>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        🗂️ Organized Storage
                    </h3>
                    <p className="text-gray-600">
                        Videos are stored neatly by Platform → Month-Year → Day.
                    </p>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        📑 Proof Library
                    </h3>
                    <p className="text-gray-600">
                        Search, filter, and review past proofs anytime with a clean library view.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 text-center text-gray-500">
                <p>© {new Date().getFullYear()} Salesync. All Rights Reserved.</p>
            </footer>
        </div>

    )
}

export default Home;