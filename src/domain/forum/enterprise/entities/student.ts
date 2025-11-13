import { Entity } from '@/core/entities/entity.js'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  // constructor({name} : StudentProps, id?: string){
  //     super({name}, id)
  // }
  // A SUPER CLASSE JÁ POSSUI UM CONSTRUTOR COM AS MESMAS PROPRIEDADES

  static create(props: StudentProps, id?: UniqueEntityId) {
    const student = new Student(props, id)
    return student
  }
}
