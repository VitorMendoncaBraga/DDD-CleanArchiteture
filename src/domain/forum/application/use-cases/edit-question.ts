import { left, right, type Either } from '@/core/either.js'
import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionRepository } from '../repositories/question-repository.js'
import { NotAllowedError } from './errors/not-allowed-error.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {
  question: Question
}>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) { }

  async execute({
    questionId,
    authorId,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)
    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId != question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.content = content
    question.title = title

    await this.questionRepository.edit(question)
    return right({
      question,
    })
  }
}
