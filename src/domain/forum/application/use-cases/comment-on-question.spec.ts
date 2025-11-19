import { beforeEach, describe, expect, test } from 'vitest'
import type { QuestionRepository } from '../repositories/question-repository.js'
import type { QuestionCommentRepository } from '../repositories/question-comment-repository.js'
import { CommentOnQuestionUseCase } from './comment-on-question.js'
import { InMemoryQuestionCommentRepository } from '@/test/repository/in-memory-question-comment-repository.js'
import { InMemoryQuestionsRepository } from '@/test/repository/in-memory-questions-repository.js'
import { Question } from '../../enterprise/entities/question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { makeQuestion } from '@/test/factories/make-question.js'
import { makeQuestionComment } from '@/test/factories/make-question-comment.js'

let questionCommentRepository: QuestionCommentRepository
let questionRepository: QuestionRepository
let sut: CommentOnQuestionUseCase

beforeEach(() => {
  questionCommentRepository = new InMemoryQuestionCommentRepository()
  questionRepository = new InMemoryQuestionsRepository()
  sut = new CommentOnQuestionUseCase(
    questionRepository,
    questionCommentRepository,
  )
})

describe('Comment On Question', () => {
  test('it should be able to comment on question', async () => {
    const question = makeQuestion({}, UniqueEntityId.create('1'))
    await questionRepository.create(question)

    const result = await sut.execute({
      authorId: '1',
      content: 'comment-example',
      questionId: '1',
    })

    expect(result.isRight()).toBeTruthy()
    
  })
})
