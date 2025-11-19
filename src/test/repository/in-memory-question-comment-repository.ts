import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import type { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment-repository.js'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.js'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentRepository
{
  public items: QuestionComment[] = []
  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  async findById(questionCommentId: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(
      (item) => item.id.toString() == questionCommentId,
    )
    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    this.items = this.items.filter(
      (item) => item.id.toString() != questionComment.id.toString(),
    )
  }

  async findManyByQuestionId(questionId: string, {page}: PaginationParams): Promise<QuestionComment[]> {
      const questionComments = this.items.filter((item) => item.questionId.toString() == questionId).slice((page - 1) * 20, page * 20)
      return questionComments
  }
}
