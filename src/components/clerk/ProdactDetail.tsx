import { ProductAddData } from '@/types/seller'
import Link from 'next/link'
import React from 'react'

interface Props {
  product: ProductAddData
}
function ProductDetail({ product }: Props) {
  console.log(product)

  return (
    <div>
      <div>
        <h3>Store : </h3>
        <Link href=""></Link>
      </div>
      <div></div>
    </div>
  )
}

export default ProductDetail
