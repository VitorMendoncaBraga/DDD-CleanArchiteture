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
}
