import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  private constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  static create(id?: string) {
    if(!id) {
      return new UniqueEntityId(randomUUID())
    }
    return new UniqueEntityId(id)
  }
}
