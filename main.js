
document.addEventListener('DOMContentLoaded', () => {
    const prompt = "summarize this podcast:";

    function processUrl() {
        const urlInput = document.getElementById('urlInput').value.trim();
        if (urlInput) {
            const newUrl = `https://subtitle.to/${urlInput}`;
            window.open(newUrl, '_blank');
            document.getElementById('fileInputContainer').style.display = 'block';
            document.getElementById('textInputContainer').style.display = 'none';
        } else {
            alert('Please enter a valid URL.');
        }
    }

    function handleFileUpload() {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please upload a text file.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileContent = e.target.result.trim();

            if (fileContent) {
                const formattedTextElement = document.getElementById('formattedText');
                const highlightedTextElement = document.getElementById('highlightedText');
                const outputContainer = document.getElementById('outputContainer');

                if (formattedTextElement && highlightedTextElement && outputContainer) {
                    const formattedText = `${prompt} "${fileContent}"`;
                    formattedTextElement.innerText = formattedText;

                    // Limit displayed content to 2 lines (around 150 characters or until a line break)
                    const shortContent = fileContent.split(/\n/).slice(0, 2).join(' ').substring(0, 150) + '...';
                    highlightedTextElement.innerText = shortContent;
                    document.getElementById('fileInputContainer').style.display = 'none';
                    outputContainer.style.display = 'flex';
                } else {
                    console.error('Output elements are not available in the DOM.');
                }
            } else {
                alert('The file is empty. Please upload a valid text file.');
            }
        };
        reader.readAsText(file);
    }

    function copyToClipboard() {
        const formattedTextElement = document.getElementById('formattedText');
        if (formattedTextElement) {
            const text = formattedTextElement.innerText;
            navigator.clipboard.writeText(text).then(() => {
                alert('Text copied to clipboard!');
                window.open('https://chatgpt.com', '_blank');
            }).catch((err) => {
                alert('Failed to copy text: ' + err);
            });
        } else {
            console.error('Formatted text element not found.');
        }
    }

    // Assign functions to global scope for button click events
    window.processUrl = processUrl;
    window.handleFileUpload = handleFileUpload;
    window.copyToClipboard = copyToClipboard;
});
