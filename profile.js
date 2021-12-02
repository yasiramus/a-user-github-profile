const url = "https://api.github.com/users/"

const main = document.querySelector('main')
const form = document.querySelector('form')
const search = document.querySelector('#search')

async function fetchUser( username ) {
    try{
        const {data} = await axios(url + username)
        createUserCard(data);
        getRepos(username);
    } catch(err){
        if (err.response.status === 404) {
                createErrorCard('No profile with such user name')
        }
    }
}

//get repos function
async function getRepos( username) {
    try{
        const {data} = await axios(url + username + '/repos?sort=created')
        addReposToCard(data);
    } catch(err){
            createErrorCard("Repositories doesn't exist")
    }
}

function createUserCard(user) {
    const htmlCards = `
    <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-details">
                <h2>${user.login}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
        `
            main.innerHTML = htmlCards
    }
//profile error message
function createErrorCard(message) {
    const htmlCards = `
        <div class="card">
        <h1>${message}</h1>
        </div>
    `
    main.innerHTML = htmlCards
    
}    

function addReposToCard(repos){
    const repostElement = document.querySelector('#repos')
        repos.slice(0, 5).forEach(repo => {
              const repoEl = document.createElement('a')
              repoEl.classList.add('repo')
              repoEl.href = repo.html_url
              repoEl.target = '_blank'
              repoEl.innerText= repo.name

              repostElement.appendChild(repoEl)
        });
}

form.addEventListener( 'submit', (e) => {
    e.preventDefault()
    const user = search.value 

        if (user) {
            fetchUser(user)
            search.value = ''  
        }
})