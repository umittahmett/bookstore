import { Minus, Plus } from 'lucide-react'
import { CounterProps } from '~/types'
import { NumericFormat } from 'react-number-format'
import { Button } from '@components/ui/button'

const Counter: React.FC<CounterProps> = ({ reduce, increase, count, onChange }) => {
  return (
    <div className='flex items-center'>
      <Button disabled={count == 1} size='closeIcon' className='rounded-md !rounded-r-none' type='button' onClick={reduce}><Minus className='size-3 text-white' /></Button>
      <NumericFormat defaultValue={count} onChange={onChange} value={count} id='founders-count' className='flex h-8 text-center rounded-none w-12 border border-zinc-200 text-zinc-700 bg-white px-1 text-sm outline-none' allowNegative={false} />
      <Button size='closeIcon' className='rounded-md !rounded-l-none' type='button' onClick={increase}><Plus className='size-3 text-white' /></Button>
    </div>
  )
}
export default Counter