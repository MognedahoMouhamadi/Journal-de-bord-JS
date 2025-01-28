let taskList = document.getElementById('taskList');

function addTask(){

    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value;
    let date1 = new Date();
    let datecomplet = date1.getDay() + "/" + date1.getMonth() + "/" + date1.getFullYear();
    let eff = document.getElementById('taskEff');
    let effText = eff.value;

    if (taskText === "" || effText ===""){
        return;
    }

    let li = document.createElement('li')
    nbr = parseInt(effText)
    
    if (nbr < 11){

        li.innerHTML = taskText +" "+ datecomplet +"     "+"efficacité : "+ effText + "/10";

    }else{
        return;
    }

 

    let editButton = document.createElement('button');
    editButton.innerHTML  = '<ion-icon name="create" class="modify" ></ion-icon>'
    editButton.onclick = function (){

        editTask(li)
    }

    let deleteButton = document.createElement('button')

    deleteButton.innerHTML ='<ion-icon name="trash"></ion-icon>'
    deleteButton.onclick = function() {

        deleteTask(li)

    }
    
    
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = "";
    eff.value = "";


}

function editTask(task){

    let taskTextElement = task.firstChild;
    let taskText = taskTextElement.textContent;

    let newTaskText = prompt('Modifier:', taskText);

    if (newTaskText === null || newTaskText === ""){
        return;
    }


    taskTextElement.textContent = newTaskText;
}


function deleteTask(task){

   taskList.removeChild(task);
}

//fais par chat GPT
function saveToFile() {
    let tasks = [];
    let taskItems = document.querySelectorAll('#taskList li');

    taskItems.forEach(item => {
        tasks.push(item.textContent.trim()); // Sauvegarde le texte de chaque tâche
    });

    let blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tasks.json'; // Nom du fichier de sauvegarde
    link.click();
}

//fait par chatGPT

document.addEventListener("DOMContentLoaded", () => {
    fetch('tasks.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Fichier 'tasks.json' introuvable.");
            }
            return response.json();
        })
        .then(tasks => {
            tasks.forEach(taskText => {
                // Crée un nouvel élément de tâche dans la liste
                let li = document.createElement('li');
                li.textContent = taskText;

                // Ajout des boutons d'édition et suppression
                let editButton = document.createElement('button');
                editButton.innerHTML = '<ion-icon name="create" class="modify"></ion-icon>';
                editButton.onclick = () => editTask(li);

                let deleteButton = document.createElement('button');
                deleteButton.innerHTML = '<ion-icon name="trash"></ion-icon>';
                deleteButton.onclick = () => deleteTask(li);

                li.appendChild(editButton);
                li.appendChild(deleteButton);

                taskList.appendChild(li);
            });
        })
        .catch(error => {
            console.log("Erreur : " + error.message);
        });
});
