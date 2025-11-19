import { right, type Either } from '@/core/either.js'
import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionRepository } from '../repositories/question-repository.js'

interface FetchRecentQuestionsRequest {
  page: number
}

type FetchRecentQuestionsResponse = Either <null,  {
  questions: Question[]
}>

export class FetchRecentQuestions {
  private questionsRepository: QuestionRepository
  constructor(questionRepository: QuestionRepository) {
    this.questionsRepository = questionRepository
  }

  async execute({
    page,
  }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
    const questions = await this.questionsRepository.findManyRecently({ page })

    return right({
      questions
    })
  }
}
