import { Discipline } from "./discipline.js"


export class Student {
    constructor(name, rawData) {
        this.name = name;
        this.disciplines = create(rawData);
    }
}

function create(rawData) {
    const rawNumbers = rawData[0].filter((_, index) => index !== 0);
    const rawDisciplines = rawData[1].filter((_, index) => index !== 0);
    const rawAnswrs = rawData[2].filter((_, index) => index !== 0);

    const disciplines = [];

    let i = 0;
    while (i < rawDisciplines.length) {
        const element = rawDisciplines[i];
        const discipline = new Discipline(element, [], []);

        // Armazena todas as respostas e números consecutivos para a mesma disciplina
        while (i < rawDisciplines.length && rawDisciplines[i] === element) {
            discipline.answers.push(rawAnswrs[i]);
            discipline.numbers.push(rawNumbers[i]);
            i++;
        }

        disciplines.push(discipline);  // Adiciona a disciplina após processar todas suas repetições
    }

    return disciplines;
}