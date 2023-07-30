import { useState, useEffect } from "react";
import TurndownService from "turndown";

export default function FormattedOutput() {
    const [isCopied, setIsCopied] = useState(false)
    const [content, setContent] = useState('')

    const turndownService = new TurndownService()

    useEffect(() => {
        setIsCopied(false)
    }, [content])

    function handleCopyClick() {
        navigator.clipboard.writeText(content)
        setIsCopied(true)
    }

    async function handlePaste() {
        try {
            const permission = await navigator.permissions.query({
                name: "clipboard-read",
            });

            if (permission.state === "denied") {
                throw new Error("Not allowed to read clipboard.");
            }

            // Request access to the clipboard with the "text/html" format
            const data = await navigator.clipboard.read([{ type: 'text/html' }]);

            console.log(data)

            // Get the first item (index 0) from the clipboard data array
            const clipboardItem = data[0];

            // Get the content as a Blob
            const blob = await clipboardItem.getType('text/html');

            console.log(blob)

            // Read the Blob content as text
            const clipHTML = await blob.text();
            console.log(clipHTML)

            const markdown = turndownService.turndown(clipHTML)

            // Display the HTML content on the page
            setContent(markdown)
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }

    return (
        <section>
            <button
                className={`bg-blue-500 rounded mr-2 py-2 px-4 my-6 text-white font-bold ${content.length === 0 ? 'opacity-50' : ''}`}
                onClick={() => handlePaste()}>Paste
            </button>
            {/* <h2 className="my-4 inline font-bold mr-4">Output:</h2> */}
            <button
                className={`bg-green-500 rounded m-2 py-2 px-4 my-6 text-white font-bold ${content.length === 0 ? 'opacity-50' : ''}`}
                onClick={() => handleCopyClick()}
                disabled={content.length === 0}
            >
                {isCopied ? 'Copied!' : 'Copy results'}
            </button>
            <div className="bg-gray-200 p-4">
                <pre className="whitespace-pre-line">{content}</pre>
            </div>
        </section>
    )
}