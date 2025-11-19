import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { QuestionComment } from '../../enterprise/entities/question-comment.js'
import type { PaginationParams } from '@/core/repositories/pagination-params.js'

export interface QuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
  findById(questionCommentId: string): Promise<QuestionComment | null>
  findManyByQuestionId(questionId: string, params: PaginationParams) : Promise<QuestionComment[]>
}
