document.addEventListener('DOMContentLoaded', ()=>{
    console.log('HTML is loaded!! good luck Lord of the Strings!')
    setupNewPersonForm();
    getPeople();
})

const getPeople = () => {
    fetch('http://localhost:3000/people')
    .then(response => response.json())
    .then(people => {
        people.forEach(person => {
            renderPerson(person)
        })
    })
}


const renderPerson = (person) => {
    const peopleContainer = document.getElementById('people')
    
        const personCard = document.createElement('div')
            personCard.className = 'card p-2 m-2'
            personCard.style = 'width: 18rem;'
           
            const personProfilePic = document.createElement('img')
                personProfilePic.src = person.profilePicture

                const cardBody = document.createElement('div')
                    cardBody.className = 'card-body'

                        const personName = document.createElement('h5')
                            personName.className = 'card-title'
                            personName.innerHTML = person.name

                            const personInstructor = document.createElement('p')
                                personInstructor.className = 'card-text'

                                    if (person["instructor?"] == true) {
                                        personInstructor.innerHTML = "🧙‍♂️ Instructor"
                                    } else {
                                        personInstructor.innerHTML = "🎓 Alum"
                                    }
                                    
                                const personPronouns = document.createElement('p')
                                    personPronouns.className = 'card-text'
                                    personPronouns.innerHTML = person.pronouns

                                    const personAlum = document.createElement('p')
                                        personAlum.className = 'card-text'
                                        personAlum["alum?"] = person["alum?"]

                                            if (person["alum?"] == true) {
                                                personAlum.innerHTML = "Attended Flatiron? Yes";
                                            } else {
                                                personAlum.innerHTML = "Attended Flatiron? No";
                                            }
                                                
                                        const personGitHubButton = document.createElement('button')
                                            const buttonName = person.name.split(' ')

                                            personGitHubButton.setAttribute('href', person.github)
                                                personGitHubButton.className = 'btn btn-primary'
                                                    personGitHubButton.innerText = `👉 Go to ${buttonName[0]}'s GitHub`
                                                    personGitHubButton.addEventListener('click', () => {
                                                        window.location.href = person.github
                                                    })

    peopleContainer.append(personCard)
        personCard.append(personProfilePic, cardBody)
            cardBody.append(personName, personInstructor, personPronouns, personAlum, personGitHubButton)

}

const setupNewPersonForm = () => {

    const peopleForm = document.getElementById('person-form')
        peopleForm.addEventListener('submit', (e) => {
            e.preventDefault()
            createNewPerson(peopleForm)
        })
}

const stringToBoolean = (string) => {
    // switch(string.toLowerCase().trim()){
    //     case "true": return true;
    //     case "false": return false;
    //     case null: return false;
    //     default: return Boolean(string);
    // }
        if (string == "true") {
            return true
        } else {
            return false
        }
}



const createNewPerson = (peopleForm) => {

        const newPerson = {
            name: peopleForm.name.value,
            pronouns: peopleForm.pronouns.value,
            "alum?": stringToBoolean(peopleForm.alum.value),
            "instructor?": stringToBoolean(peopleForm.instructor.value),
            github: peopleForm.github.value,
            profilePicture: peopleForm.profile.value,
        }

        fetch('http://localhost:3000/people', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(newPerson)
        })
        .then(response => response.json())
        .then(newPerson => renderPerson(newPerson))
}