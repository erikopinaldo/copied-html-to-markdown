import { useState, useEffect } from "react";

export default function FormattedOutput({ content }) {
    const [isCopied, setIsCopied] = useState(false)

    const formattedText = content.replaceAll(/[;,]/g, '\n')

    useEffect(() => {
        setIsCopied(false)
    }, [content])

    function handleCopyClick() {
        navigator.clipboard.writeText(formattedText)
        setIsCopied(true)
    }

    return (
        <section>
            <h2 className="my-4 inline font-bold mr-4">Output:</h2>
            <button
                className={`bg-green-500 rounded py-2 px-4 my-6 text-white font-bold ${content.length === 0 ? 'opacity-50' : ''}`}
                onClick={() => handleCopyClick()}
                disabled={content.length === 0}
            >
                {isCopied ? 'Copied!' : 'Copy results'}
            </button>
            <div className="bg-gray-200 p-4">
                <pre className="whitespace-pre-line">{formattedText}</pre>
            </div>
        </section>
    )
}