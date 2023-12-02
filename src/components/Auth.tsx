'use client'

import { signIn, useSession, signOut } from 'next-auth/react'
import React from 'react'
import { Config, Connect } from '@vkontakte/superappkit'
import styles from './Auth.module.scss'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import Image from 'next/image'

const Auth = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const searchParams = useSearchParams()

  const payload = searchParams && searchParams.get('payload')
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
      source: 'phone_number',
      action: undefined,
      screen: undefined,
    })

  // console.log(router)
  console.log(payload)

  return (
    <div>
      <button onClick={() => signIn('vk')}>VK</button>
      <button onClick={() => signOut()}>Выйти</button>
      {session && session.user?.name && <div>{session.user?.name}</div>}
      {/* {session && <div>{session.user}</div>} */}
      {session && session.user?.name && (
        <Image
          src={payload && payload.avatar && payload?.avatar}
          width={500}
          height={500}
          alt="Picture of the author"
        />
      )}
      <button className={styles.btn} onClick={redirectAuthHandler}>
        Авторизация
      </button>
    </div>
  )
}

export default Auth
