import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionRepository } from '../repositories/question-repository.js'

interface DeleteQuestionUseCaseRequest {
    authorId: string
    id: string
}

interface DeleteQuestionUseCaseResponse {
    question: Question
}

export class DeleteQuestionUseCase {

    private questionRepository: QuestionRepository

    constructor(questionRepository: QuestionRepository) {
        this.questionRepository = questionRepository
    }

    async execute({ id, authorId }: DeleteQuestionUseCaseRequest) {

        const question = await this.questionRepository.findById(id)
        
        if (!question) {
            throw new Error('Question doesnt exists')
        }

        if (!authorId) {
            throw new Error("Author not found")
        }

        if (authorId != question.authorId.toString()) {
            throw new Error("Not allowed")
        }

        await this.questionRepository.delete(id)

        return {
            question,
        }

    }
}
