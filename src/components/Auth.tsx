'use client'

import { signIn, useSession, signOut } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'
import { Config, Connect } from '@vkontakte/superappkit'
import styles from './Auth.module.scss'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import Image from 'next/image'
import Head from 'next/head'

import { VKShareButton } from 'react-share'

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

  console.log(res)
  // console.log(obj.user.avatar)

  return (
    <div className={styles.container}>
      <button onClick={() => signIn('vk')} className={styles.btn}>
        VK вход через oAuth 2.0
      </button>
      <button onClick={() => signOut()} className={styles.btn}>
        Выйти из oAuth 2.0
      </button>
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
        Авторизация по SDK
      </button>
      <div>
        <VKShareButton
          url="https://testgame-nine.vercel.app/"
          image="https://n1s2.hsmedia.ru/99/ad/c4/99adc4eaeefb544a5489e57646d1c32a/1200x1200_0xac120003_1253669631666266022.jpeg"
          title="Какой то текст для поделиться"
        >
          <div className={styles.btnShare}>Поделиться</div>
        </VKShareButton>
      </div>
    </div>
  )
}

export default Auth
