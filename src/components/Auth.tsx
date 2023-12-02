'use client'

import { signIn, useSession, signOut } from 'next-auth/react'
import React from 'react'
import { Config, Connect } from '@vkontakte/superappkit'
import styles from './Auth.module.scss'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import Image from 'next/image'

interface DateWithUser {
  user?:
    | {
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
        bday?: string
        last_name?: string
      }
    | undefined
  expires?: string | undefined
}

const Auth = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const res: DateWithUser | null = session

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

  const jsonString = payload ? payload : '123'
  const obj = JSON.parse(jsonString)
  // console.log(router)
  console.log(obj)
  // console.log(obj.user.avatar)

  return (
    <div>
      <button onClick={() => signIn('vk')}>VK</button>
      <button onClick={() => signOut()}>Выйти</button>
      {<div>{JSON.stringify(session)}</div>}
      {<div>{JSON.stringify(res)}</div>}

      {/* {session && <div>{session.user}</div>} */}
      {payload && (
        <Image
          src={obj.user.avatar}
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
