import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Question } from '../../enterprise/entities/question.js'
import type { QuestionRepository } from '../repositories/question-repository.js'
import { right, type Either } from '@/core/either.js'

interface CreateQuestionUseCaseRequest {
  title: string
  content: string
  authorId: string
}

type CreateQuestionUseCaseResponse = Either<null, {
  question: Question
}>

export class CreateQuestionUseCase {
  private questionRepository: QuestionRepository
  constructor(questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository
  }

  async execute({
    title,
    content,
    authorId,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      title,
      content,
      authorId: UniqueEntityId.create(authorId),
    })
    await this.questionRepository.create(question)
    return right({
      question,
    })
  }
}
