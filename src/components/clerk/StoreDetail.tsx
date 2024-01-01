import Image from 'next/image'
import React from 'react'

interface Props {
  store: Store
}
function StoreDetail({ store }: Props) {
  return (
    <div>
      <div className="relative size-20 rounded-md bg-slate-500 ">
        <Image
          width={100}
          height={100}
          className="absolute rounded-sm w-full h-full "
          alt="image of clerk"
          src={store.image_owner}
        />
      </div>
      <h3>Name : {store.title}</h3>
      <div className="space-y-2">
        <h3>Description : </h3>
        <p>{store.description}</p>
      </div>
    </div>
  )
}

export default StoreDetail
