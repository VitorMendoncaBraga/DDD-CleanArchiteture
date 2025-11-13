import type { AnswerRepository } from "../repositories/answer-repository.js"

interface DeleteAnswerRequest {
    authorId: string,
    id: string
}

export class DeleteAnswerUseCase {
    private answerRepository: AnswerRepository
    constructor(answerRepository: AnswerRepository) {
        this.answerRepository = answerRepository
    }

    async execute({authorId, id} : DeleteAnswerRequest) {
        const answer = await this.answerRepository.findById(id)
        if(!answer) {
            throw new Error("Answer not found")
        }
        if(authorId != answer.instructorId.toString()){
            throw new Error("Not allowed")
        }
        await this.answerRepository.delete(answer)
        return answer
    }
}