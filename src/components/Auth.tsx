'use client'

import { signIn, useSession, signOut } from 'next-auth/react'
import React from 'react'

const Auth = () => {
  const { data: session, status } = useSession()

  console.log(session)

  return (
    <div>
      <button onClick={() => signIn('vk')}>VK</button>
      <button onClick={() => signOut()}>Выйти</button>
      {session && session.user?.name && <div>{session.user?.name}</div>}
      {/* {session && <div>{session.user}</div>} */}
    </div>
  )
}

export default Auth
