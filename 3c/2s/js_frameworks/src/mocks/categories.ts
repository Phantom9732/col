import phones from '@/assets/images/phones.svg'
import comp from '@/assets/images/computers.svg'
import watches from '@/assets/images/watches.svg'
import gadgets from '@/assets/images/headphones.svg'
import tablets from '@/assets/images/tablets.svg'
import accessories from '@/assets/images/accessories.svg'

export type Category = {
  id: number
  name: string
  image: string
}

export const categories: Category[] = [
  { id: 1, name: 'Accessories', image: accessories },
  { id: 2, name: 'Smartphones', image: phones },
  { id: 3, name: 'Computers', image: comp },
  { id: 4, name: 'Tablets', image: tablets },
  { id: 5, name: 'Smartwatches', image: watches },
  { id: 6, name: 'Gadgets', image: gadgets },
]
