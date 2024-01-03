import { getProductAction } from '@/app/_actions/clerk/seller'
import ProductDetail from '@/components/clerk/ProdactDetail'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { ProductAddData } from '@/types/seller'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: { productId: string }
}
async function page({ params }: Props) {
  const productId = params.productId
  const productData: ProductAddData = await getProductAction(productId)
  console.log(productData)

  return (
    <div>
      <div>
        <Link href={`/clerk/seller/stores/${productData.storeId}`}>
          Go to the store
        </Link>
      </div>
      <div className="space-y-2 mt-4">
        <div className="flex items-center">
          <h2>Title: </h2>

          <h3 className="ml-1"> {productData.title}</h3>
        </div>
        <div className="flex items-center">
          <h2>Description: </h2>
          <h3 className="ml-1">{productData.description}</h3>
        </div>
        <div className="flex items-center ">
          <h2>Fast Shipping: </h2>
          <h3 className="ml-1">
            {productData.fastShipping ? <Icons.check /> : <Icons.close />}
          </h3>
        </div>
        <div className="flex items-center ">
          <h2>Tags: </h2>
          {productData.tags.map((item, index) => (
            <h3 key={index} className="border-2 rounded-md px-0.5 ml-1">
              {item}
            </h3>
          ))}
        </div>
        <div className=" items-center ">
          <h2>detail Description: </h2>
          {productData.detailDescription.map((item, index) => (
            <div key={index}>
              <div className="flex items-center">
                <h3>{item.title}: </h3>
                <h3 className="ml-1">{item.describe}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {productData.detailsProduct.map((item, index) => (
            <div
              className="border rounded-xl p-4 space-y-3 w-fit  md:max-w-1/2"
              key={item.uuid}
            >
              <div className="flex items-center">
                <h2>Size: </h2>
                <h3 className="ml-1">{item.size}</h3>
                <h2 className="ml-4">Color: </h2>
                <div
                  style={{ backgroundColor: `${item.color.color}` }}
                  className="ml-1 size-6 border-2 rounded-full"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {item.images.map((image, indexImg) => (
                  <div
                    className="bg-slate-300 size-16  rounded-md relative overflow-hidden"
                    key={indexImg}
                  >
                    <Image
                      width={200}
                      height={200}
                      alt="images of product"
                      src={image}
                      className="absolute object-cover size-full"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <h2>Price: </h2>
                <h3 className="ml-1">{item.price}</h3>
                <h2 className="ml-4">Discount: </h2>
                <h3 className="ml-1">{item.discount} %</h3>
              </div>
              <div className="flex items-center">
                <h2>Remained Count: </h2>

                <h3 className="ml-1">{item.remainedCount}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <ProductDetail data={productData} /> */}
    </div>
  )
}

export default page
