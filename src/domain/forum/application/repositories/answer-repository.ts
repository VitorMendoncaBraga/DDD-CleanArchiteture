import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  edit(answer: Answer): Promise<void>
  findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]>
}
