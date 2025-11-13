import { expect, test, beforeEach, describe } from 'vitest'
import { CreateQuestionUseCase } from './create-question.js'
import type { QuestionRepository } from '@/domain/forum/application/repositories/question-repository.js'
import { InMemoryQuestionsRepository } from '../../../../test/repository/in-memory-questions-repository.js'

let inMemoryQuestionRepository: QuestionRepository
let createQuestionUseCase: CreateQuestionUseCase

beforeEach(() => {
  inMemoryQuestionRepository = new InMemoryQuestionsRepository()
  createQuestionUseCase = new CreateQuestionUseCase(inMemoryQuestionRepository)
})

describe('Create Question', () => {
  test('it should be able to create a question', async () => {
    const { question } = await createQuestionUseCase.execute({
      content: 'Uma pergunta',
      authorId: '1',
      title: 'Um título',
    })
    expect(question.title).toEqual('Um título')
    expect(question.id).toBeTruthy()
  })
})
