
const articlePath = 'articles/';
const articleList = 'articles/index.json';

document.addEventListener('DOMContentLoaded', loadArticleList);

async function loadArticleList() {
    const articleContainer = document.getElementById('article');
    try {
        const response = await fetch(articleList);
        const data = await response.json();
        data.forEach(article => {
            const dateTag = article.date ? `<p>Date: ${article.date}</p>` : '';
            articleContainer.innerHTML += `
            <article>
                <h2>${article.title}</h2>
                ${dateTag}
                <p>${article.summary}</p>
                <a href="#" onclick="loadArticle('${articlePath}${article.file}', '${article.date}'); return false;">Read more...</a>
            </article>
            `;
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}

async function loadArticle(file, date) {
    const articleContainer = document.getElementById('article');
    try {
        const response = await fetch(file);
        let text = '';
        if (response.ok) {
            text = await response.text();
            text = addAuthor(date) + text;
        } else {
            text = '## Writing in progress';
        }
        articleContainer.innerHTML = marked.parse(text);
    } catch (error) {
        console.error('Error fetching article:', error);
        articleContainer.innerHTML = '<p>Error loading article.</p>';
    }
}

function addAuthor(dateString) {
    if (dateString  === 'undefined') {
        return 'By **Ming Sun** \n';
    } else {
        const dateObject = new Date(dateString);
        const localDateString = dateObject.toLocaleDateString();
        return 'By **Ming Sun** on ' + localDateString + '\n';
    }
}