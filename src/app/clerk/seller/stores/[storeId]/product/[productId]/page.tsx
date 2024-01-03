import { getProductAction } from '@/app/_actions/clerk/seller'
import ProductDetail from '@/components/clerk/ProdactDetail'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: { productId: string }
}
async function page({ params }: Props) {
  const productId = params.productId
  const productData = await getProductAction(productId)
  console.log(productData)

  return (
    <div>
      <div>
        <Link href={`/clerk/seller/stores/${productData.storeId}`}>
          Go to the store
        </Link>
      </div>
      <div>
        <div className="flex items-center">
          <h2>Title: </h2>

          <h3 className="ml-1"> {productData.title}</h3>
        </div>
        <div className="bg-black w-[200px] h-[300px] rounded-md relative flex flex-col items-center">
          <div className="bg-yellow-500 size-24  "></div>
          <h3 className="text-white ">Just for test</h3>
          <div className="bg-purple-700 w-full h-24 bottom-0"></div>
        </div>
      </div>
      {/* <ProductDetail data={productData} /> */}
    </div>
  )
}

export default page
