import { left, right, type Either } from '@/core/either.js'
import type { Question } from '../../enterprise/entities/question.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'
import type { QuestionRepository } from '../repositories/question-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface GetQuestionBySlugRequest {
  slug: string
}

type GetQuestionBySlugResponse = Either<ResourceNotFoundError,  {
  question: Question
}>

export class GetQuestionBySlug {
  private questionRepository: QuestionRepository

  constructor(questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({
    slug,
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
     return left(new ResourceNotFoundError())
    }

    return right({
      question
    })
  }
}
