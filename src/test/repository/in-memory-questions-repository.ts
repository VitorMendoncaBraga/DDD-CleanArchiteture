import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import type { QuestionRepository } from '@/domain/forum/application/repositories/question-repository.js'
import type { Question } from '@/domain/forum/enterprise/entities/question.js'

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = []

  async create(question: Question): Promise<void> {
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
    this.items = this.items.filter((item) => item.id.toString() != id)
  }

  async edit(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex((item) => item.id == question.id)
    this.items[questionIndex] = question
  }

  async findManyRecently({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice((page - 1) * 20, page * 20)
    console.log(questions)
    return questions
  }
}
