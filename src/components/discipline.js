export class Discipline {
    constructor(_name, _answers, _numbers) {
        this.name = _name 
        this.answers = _answers
        this.numbers = _numbers
        
        this.rightQuestions
    }

    validateAnswers(answerKey) {
        const rightQuestions = []
        
        for (
            let i = 0; 
            i < answerKey.answers.length; 
            i++
        ) {
            let question = this.answers[i]
            
            if (question == answerKey.answers[i] || answerKey.answers[i] == undefined) {
                rightQuestions.push(question)
            }
        }

        this.rightQuestions = rightQuestions
    }
}
