import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { AnswerComment } from '../../enterprise/entities/answer-comment.js'
import type { AnswerRepository } from '../repositories/answer-repository.js'
import type { AnswerCommentRepository } from '../repositories/anwer-comment-repository.js'
import { left, right, type Either } from '@/core/either.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface CommentOnAnswerUseCaseRequest {
    authorId: string
    answerId: string
    content: string
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, {
    answerComment: AnswerComment
}>

export class CommentOnAnswerUseCase {
    constructor(
        private answerRepository: AnswerRepository,
        private answerCommentRepository: AnswerCommentRepository,
    ) { }

    async execute({
        answerId,
        authorId,
        content,
    }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId)
        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        const answerComment = AnswerComment.create({
            answerId: UniqueEntityId.create(answerId),
            authorId: UniqueEntityId.create(authorId),
            content,
        })
        await this.answerCommentRepository.create(answerComment)

        return right({answerComment})
    }
}
