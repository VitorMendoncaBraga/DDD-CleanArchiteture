import { beforeEach, describe, expect, test } from 'vitest'
import type { QuestionRepository } from '../repositories/question-repository.js'
import { GetQuestionBySlug } from './get-question-by-slug.js'
import { InMemoryQuestionsRepository } from '@/test/repository/in-memory-questions-repository.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'
import { makeQuestion } from '@/test/factories/make-question.js'

let questionRepository: QuestionRepository
let sut: GetQuestionBySlug

beforeEach(() => {
  questionRepository = new InMemoryQuestionsRepository()
  sut = new GetQuestionBySlug(questionRepository)
})

describe('Get Question By Slug', () => {
  test('it should be able to find a question by slug', async () => {
    const newQuestion = makeQuestion({
      title: 'Question 1',
      slug: Slug.create('question-1'),
    })

    await questionRepository.create(newQuestion)

    const result = await sut.execute({ slug: 'question-1' })
    expect(result.isRight()).toBeTruthy()
    if(result.isRight()) {
      expect(result.value.question.title).toEqual('Question 1')
    }
  })
})
