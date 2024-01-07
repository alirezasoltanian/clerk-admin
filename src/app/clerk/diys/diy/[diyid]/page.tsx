import React from 'react'

interface Props {}
const page: React.FC<{
  params: {
    diyid: string
  }
}> = ({ params }) => {
  const diyid = params.diyid

  return <div>{diyid}</div>
}

export default page
