import React from 'react'

interface Props {}
const page: React.FC<{
  params: {
    teacherid: string
  }
}> = ({ params }) => {
  const teacherid = params.teacherid

  return <div>{teacherid}</div>
}

export default page
