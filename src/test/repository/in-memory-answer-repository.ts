import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository.js'
import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    this.items = this.items.filter((item) => item.id != answer.id)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toValue() == id)
    if (!answer) {
      return null
    }

    return answer
  }

  async edit(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id == answer.id)
    this.items[answerIndex] = answer
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() == questionId)
      .splice((page - 1) * 20, page * 20)
    return answers
  }
}
