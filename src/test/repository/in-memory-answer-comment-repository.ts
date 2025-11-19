import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import type { AnswerCommentRepository } from '@/domain/forum/application/repositories/anwer-comment-repository.js'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.js'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentRepository
{
  private items: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }

  async findById(answerCommentId: string): Promise<AnswerComment | null> {
      const answerComment = this.items.find((item) => item.id.toString() == answerCommentId)
      if(!answerComment) {
        return null
      }
      return answerComment
  }

  async delete(answerComment: AnswerComment): Promise<void> {
      this.items = this.items.filter((item) => item.id.toString() != answerComment.id.toString())
  }

  async findManyByAnswerId(answerId: string, {page}: PaginationParams): Promise<AnswerComment[]> {
      const answerComments = this.items.filter((item) => item.answerId.toString() == answerId).slice((page - 1) * 20, page * 20)

      return answerComments
  }
}
