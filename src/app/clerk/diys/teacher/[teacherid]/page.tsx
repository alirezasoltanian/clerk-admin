'use server'

import React from 'react'

const page: React.FC<{
  params: {
    teacherid: string
  }
}> = async ({ params }) => {
  const teacherid = params.teacherid

  return <div>{teacherid}</div>
}

export default page
