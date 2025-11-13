import type { QuestionRepository } from '@/domain/forum/application/repositories/question-repository.js'
import type { Question } from '@/domain/forum/enterprise/entities/question.js'
import type { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js'

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value == slug)
    if (!question) {
      return null
    }

    return question
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toValue() == id)
    console.log(this.items)
    if (!question) {
      return null
    }
    return question
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() != id )
  }
}
