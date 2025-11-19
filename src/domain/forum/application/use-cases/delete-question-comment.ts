import { left, right, type Either } from '@/core/either.js'
import type { QuestionComment } from '../../enterprise/entities/question-comment.js'
import type { QuestionCommentRepository } from '../repositories/question-comment-repository.js'
import type { QuestionRepository } from '../repositories/question-repository.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {
  questionComment: QuestionComment
}>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)
    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId != questionComment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionCommentRepository.delete(questionComment)

    return right({
        questionComment
    })
  }
}
