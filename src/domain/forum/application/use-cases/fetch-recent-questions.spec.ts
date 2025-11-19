import { beforeEach, describe, expect, test } from 'vitest'
import type { QuestionRepository } from '../repositories/question-repository.js'
import { FetchRecentQuestions } from './fetch-recent-questions.js'
import { InMemoryQuestionsRepository } from '@/test/repository/in-memory-questions-repository.js'
import { makeQuestion } from '@/test/factories/make-question.js'

let questionRepository: QuestionRepository
let sut: FetchRecentQuestions

beforeEach(() => {
  questionRepository = new InMemoryQuestionsRepository()
  sut = new FetchRecentQuestions(questionRepository)
})

describe('Fetch Recently Questions', () => {
  test('it should be able fetch recently questions', async () => {
    for (let i = 0; i < 18; i++) {
      const question = makeQuestion({ created_at: new Date(2025, 10, i) })
      await questionRepository.create(question)
    }

    const result = await sut.execute({ page: 1 })
    expect(result.isRight()).toBeTruthy()
    if(result.isRight()) {
      expect(result.value.questions).toHaveLength(18)
    }
  })
})
