import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { QuestionComment } from '../../enterprise/entities/question-comment.js'
import type { QuestionRepository } from '../repositories/question-repository.js'
import type { QuestionCommentRepository } from '../repositories/question-comment-repository.js'
import { left, right, type Either } from '@/core/either.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface CommentOnQuestionUseCaseRequest {
    questionId: string
    content: string
    authorId: string
}

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, {
    questionComment: QuestionComment
}>

export class CommentOnQuestionUseCase {
    constructor(
        private questionRepository: QuestionRepository,
        private questionCommentRepository: QuestionCommentRepository,
    ) { }

    async execute({
        authorId,
        content,
        questionId,
    }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId)
        if (!question) {
            return left(new ResourceNotFoundError())
        }

        const questionComment = QuestionComment.create({
            authorId: UniqueEntityId.create(authorId),
            content,
            questionId: UniqueEntityId.create(questionId),
        })
        await this.questionCommentRepository.create(questionComment)
        return right({
            questionComment,
        })
    }
}
