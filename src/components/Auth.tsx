'use client'

import { signIn, useSession } from 'next-auth/react'
import React from 'react'

const Auth = () => {
  const { data: session, status } = useSession()

  console.log(session)

  return (
    <div>
      <button onClick={() => signIn('vk')}>VK</button>

      {/* {session && <div>{session.user}</div>} */}
    </div>
  )
}

export default Auth
