import type { Question } from '../../enterprise/entities/question.js'
import type { Slug } from '../../enterprise/entities/value-objects/slug.js'

export interface QuestionRepository {
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  findById(id: string): Promise<Question | null>
  delete(id: string): Promise<void>
  edit(question: Question): Promise<void>
}
