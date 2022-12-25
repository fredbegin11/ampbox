import { ToneWithContextOptions } from 'tone/build/esm/core/context/ToneWithContext'
import { v4 as uuidv4 } from 'uuid'

interface EffectProps<T> {
  node: T
  orderWeight: number
}

export class Effect<T extends ToneWithContextOptions> {
  id: string
  node: T
  orderWeight: number

  constructor({ node, orderWeight }: EffectProps<T>) {
    this.id = uuidv4()
    this.node = node
    this.orderWeight = orderWeight
  }
}
