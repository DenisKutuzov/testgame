'use client'

import { signIn, useSession, signOut } from 'next-auth/react'
import React from 'react'
import { Config, Connect } from '@vkontakte/superappkit'
import styles from './Auth.module.scss'

const Auth = () => {
  const { data: session, status } = useSession()

  Config.init({
    appId: 51806222, // Тут нужно подставить ID своего приложения.

    appSettings: {
      agreements: '',
      promo: '',
      vkc_behavior: '',
      vkc_auth_action: '',
      vkc_brand: '',
      vkc_display_mode: '',
    },
  })

  const redirectAuthHandler = () =>
    Connect.redirectAuth({
      url: 'https://testgame-nine.vercel.app/',
      state: '',
      source: '',
      action: undefined,
      screen: undefined,
    })

  console.log(session)

  return (
    <div>
      <button onClick={() => signIn('vk')}>VK</button>
      <button onClick={() => signOut()}>Выйти</button>
      {session && session.user?.name && <div>{session.user?.name}</div>}
      {/* {session && <div>{session.user}</div>} */}

      <button className={styles.btn} onClick={redirectAuthHandler}>
        Авторизация{' '}
      </button>
    </div>
  )
}

export default Auth
