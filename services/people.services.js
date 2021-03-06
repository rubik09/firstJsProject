const fs = require("fs")

function People(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
}
let people1 = new People(1, 'Roman', 25)
let people2 = new People(2, 'Alesya', 23)
let people = []
people.push(people1, people2);

class PeopleServices {
    getPeople() {
        return new Promise((res, rej) => {
            fs.readFile("people.json", "utf8", (err, data) => {
                if (err) throw err;
                res(JSON.parse(data))
            })
        })
    }
    getPeopleById(id) {
        return new Promise((res, rej) => {
            fs.readFile("people.json", "utf8", (err, data) => {
                if (err) throw err;
                let arrPeople = JSON.parse(data);
                let person = arrPeople.find(item => item.id == id);
                res(person);
            })
        })
    }
    addPerson(body) {
        return new Promise((res, rej) => {
            fs.readFile("people.json", "utf8", (err, data) => {
                if (err) throw err;
                let arrPeople = JSON.parse(data);
                arrPeople.push(body);

                fs.writeFile("people.json", JSON.stringify(arrPeople), (err) => {
                    if (err) throw err;
                })
                res({message : 'Person added'})
            })
        })
    }
    editPerson(id, body) {
        return new Promise((res, rej) => {
            fs.readFile("people.json", "utf8", (err, data) => {
                if (err) throw err;
                let arrPeople = JSON.parse(data);
                arrPeople.find((item, index) => {
                    if (id == item.id) {
                        arrPeople[index] = body;
                    }
                });

                fs.writeFile("people.json", JSON.stringify(arrPeople), (err) => {
                    if (err) throw err;
                })
                res({message : 'Person edited'})
            })
        })
    }
    deletePerson(id) {
        return new Promise((res, rej) => {
            fs.readFile("people.json", "utf8", (err, data) => {
                if (err) throw err;
                let arrPeople = JSON.parse(data);
                let index = arrPeople.findIndex(item => item.id == id);
                arrPeople.splice(index, 1)

                fs.writeFile("people.json", JSON.stringify(arrPeople), (err) => {
                    if (err) throw err;
                })
                res({message : 'Person deleted'});
            })
        })
    }
}

module.exports = new PeopleServices();