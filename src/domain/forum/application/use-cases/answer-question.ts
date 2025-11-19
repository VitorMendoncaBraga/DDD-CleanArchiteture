import { right, type Either } from '@/core/either.js'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id.js'
import { Answer } from '../../enterprise/entities/answer.js'
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository.js'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  private answerRepository: AnswerRepository

  constructor(answerRepository: AnswerRepository) {
    this.answerRepository = answerRepository
  }

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) : Promise<Either<null, AnswerQuestionUseCaseResponse>> {
    const answer = Answer.create({
      content,
      instructorId: UniqueEntityId.create(instructorId),
      questionId: UniqueEntityId.create(questionId),
    })

    await this.answerRepository.create(answer)

    return right({answer})
  }
}
