import { ToneWithContextOptions } from 'tone/build/esm/core/context/ToneWithContext'
import { v4 as uuidv4 } from 'uuid'

export class Effect<T extends ToneWithContextOptions> {
  id: string
  node: T

  constructor(node: T) {
    this.id = uuidv4()
    this.node = node
  }
}
