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

    for (
        let i = 0; 
        i < rawDisciplines.length; 
        i++
    ) {
        const element = rawDisciplines[i];
        const discipline = new Discipline(element, [], [])

        // Conta quantas vezes o elemento atual aparece consecutivamente
        for (let j = i; 
            j < rawDisciplines.length; 
            j++
        ) {
            if (rawDisciplines[j] === element) {
                discipline.answers.push(rawAnswrs[j]);
                discipline.numbers.push(rawNumbers[j]);
            } else {
                disciplines.push(discipline); // Adiciona answers ao array disciplines
                i = j - 1; // Ajusta o índice principal para pular as repetições já contadas
                break; // Sai do loop se o elemento não for igual
            }
        }

        // Se ainda houver repetições na última iteração
        if (discipline.answers.length > 0 && i === rawDisciplines.length - 1) {
            disciplines.push(discipline);
        }
    }

    return disciplines
}