async function createDefinition(event) {
    event.preventDefault();

    const wordInput = document.getElementById("word");
    const definitionInput = document.getElementById("definition");
    const responseDiv = document.getElementById("responseDiv");

    const word = wordInput.value.toLowerCase();
    const definition = definitionInput.value;

    try {
        const response = await fetch('https://comp-4537-lab4-server2.vercel.app/?=', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word, definition }),
        });

        if (response.ok) {
            const data = await response.json();
            responseDiv.textContent = `Response: ${data.message}`;
        } else {
            const data = await response.json();
            responseDiv.textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error('Error creating definition:', error);
        responseDiv.textContent = 'An error occurred while creating the definition.';
    }
}