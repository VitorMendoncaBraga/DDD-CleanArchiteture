import { left, right, type Either } from '@/core/either.js'
import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionRepository } from '../repositories/question-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

interface DeleteQuestionUseCaseRequest {
    authorId: string
    id: string
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    question: Question
}>

export class DeleteQuestionUseCase {
    private questionRepository: QuestionRepository

    constructor(questionRepository: QuestionRepository) {
        this.questionRepository = questionRepository
    }

    async execute({
        id,
        authorId,
    }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(id)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (!authorId) {
            return left(new ResourceNotFoundError())
        }

        if (authorId != question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        await this.questionRepository.delete(id)

        return right({
            question,
        })
    }
}
