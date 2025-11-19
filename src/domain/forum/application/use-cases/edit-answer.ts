import { left, right, type Either } from '@/core/either.js'
import type { Answer } from '../../enterprise/entities/answer.js'
import type { AnswerRepository } from '../repositories/answer-repository.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {
  answer: Answer
}>

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)
    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId != answer.instructorId.toString()) {
       return left(new NotAllowedError())
    }

    answer.content = content

    await this.answerRepository.edit(answer)

    return right({
      answer
    })
  }
}
