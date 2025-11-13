import { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
}
