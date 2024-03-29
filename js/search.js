// DISCLOSURE: I've used ChatGPT to code this lab.
// I've also tried my best to use OOP.

// HOSTED URL for Server 1: https://comp4537-lab4-server1.netlify.app/
// HOSTED URL for Server 2: https://comp-4537-lab4-server2.vercel.app/ 

// This lab was good practice on working and learning CORS, Fetch API, and OOP in JavaScript.

class DictionarySearch {
    constructor() {
        this.searchInput = document.getElementById("searchInput");
        this.responseArea = document.getElementById("responseArea");
    }

    async search() {
        const searchTerm = this.searchInput.value.toLowerCase();

        try {
            const response = await fetch(`https://comp-4537-lab4-server2.vercel.app/?word=${searchTerm}`, {
                method: 'GET',
            });
            const data = await response.json();

            if (response.ok) {
                if (data.definition) {
                    this.responseArea.innerHTML = `
                    <p>Definition of <span class="response">${searchTerm}</span>: ${data.definition}</p>
                    <p>Total server requests: ${data.requestCount}</p>`;
                } else {
                    this.responseArea.innerHTML = `<p>Error: Definition not found for ${searchTerm}</p>`;
                }
            } else {
                this.responseArea.innerHTML = `<p>Error: ${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

const dictionarySearch = new DictionarySearch();

document.querySelector('button').addEventListener('click', () => {
    dictionarySearch.search();
});