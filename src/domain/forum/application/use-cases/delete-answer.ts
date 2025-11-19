import { left, right, type Either } from '@/core/either.js'
import type { AnswerRepository } from '../repositories/answer-repository.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import type { Answer } from '../../enterprise/entities/answer.js'

interface DeleteAnswerRequest {
  authorId: string
  id: string
}

type DeleteAnswerResponse = Either<NotAllowedError | ResourceNotFoundError, {answer: Answer}>

export class DeleteAnswerUseCase {
  private answerRepository: AnswerRepository
  constructor(answerRepository: AnswerRepository) {
    this.answerRepository = answerRepository
  }

  async execute({ authorId, id }: DeleteAnswerRequest) : Promise<DeleteAnswerResponse> {
    const answer = await this.answerRepository.findById(id)
    if (!answer) {
     return left(new ResourceNotFoundError())
    }
    if (authorId != answer.instructorId.toString()) {
      return left(new NotAllowedError())
    }
    await this.answerRepository.delete(answer)
    return right({
        answer
    })
  }
}
