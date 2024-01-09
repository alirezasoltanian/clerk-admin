'use server'

import React from 'react'

const page: React.FC<{
  params: {
    diyid: string
  }
}> = async ({ params }) => {
  const diyid = params.diyid

  return <div>{diyid}</div>
}

export default page
