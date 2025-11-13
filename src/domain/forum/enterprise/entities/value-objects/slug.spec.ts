import { expect, test } from 'vitest'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js'

test('it should be able to transform text to slug', () => {
  const slug = Slug.createFromText('Example  question title ')
  expect(slug.value).toEqual('example-question-title')
})
