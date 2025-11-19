import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { AnswerRepository } from '../repositories/answer-repository.js'
import type { QuestionRepository } from '../repositories/question-repository.js'
import type { Question } from '../../enterprise/entities/question.js'
import { left, right, type Either } from '@/core/either.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface ChooseBestQuestionAnswerUseCaseRequest {
    authorId: string
    answerId: string
}

type ChooseBestQuestionAnswerUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {
    question: Question
}>

export class ChooseBestQuestionAnswerUseCase {
    private questionRepository: QuestionRepository
    private answerRepository: AnswerRepository
    constructor(
        questionRepository: QuestionRepository,
        answerRepository: AnswerRepository,
    ) {
        this.questionRepository = questionRepository
        this.answerRepository = answerRepository
    }

    async execute({
        authorId,
        answerId,
    }: ChooseBestQuestionAnswerUseCaseRequest): Promise<ChooseBestQuestionAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        const question = await this.questionRepository.findById(
            answer.questionId.toString(),
        )

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId != question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        question.bestAnswerId = UniqueEntityId.create(answerId)

        await this.questionRepository.edit(question)

        return right({ question })
    }
}
