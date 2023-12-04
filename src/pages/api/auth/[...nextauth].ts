import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import VkProvider from 'next-auth/providers/vk'
// import {User} from '@/types/interface'

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID as string,
      clientSecret: process.env.VK_CLIENT_SECRET as string,
      authorization: `https://oauth.vk.com/authorize?scope=email,notify,friends,photos,phone_number&v=5.131`,
      userinfo: `https://api.vk.com/method/users.get?fields=email,photo_max,bdate,last_name,city,contacts&v=5.131`,
      profile(result) {
        const profile = result.response?.[0] ?? {}
        return {
          id: profile.id,
          name: [profile.first_name, profile.last_name]
            .filter(Boolean)
            .join(' '),
          email: profile.email,
          image: profile.photo_100,
          bdate: profile.bdate,
          city: profile.city,
        }
      },
      // async profile(profile, tokens) {
      //   const userInfoResponse = await fetch(
      //     `https://api.vk.com/method/users.get?fields=email,photo_max,bdate,last_name,city,contacts,&access_token=${tokens.access_token}&v=5.131`
      //   )
      //   const userInfoData = await userInfoResponse.json()
      //   const userInfo = userInfoData.response[0]
      //   console.log(userInfoData)
      //   // Получить дополнительные данные о пользователе VK
      //   const user = {
      //     id: userInfo.id,
      //     name: userInfo.first_name,
      //     last_name: userInfo.last_name,
      //     email: userInfo.email,
      //     image: userInfo.photo_max,
      //     bday: userInfo.bdate,
      //     city: userInfo.city,
      //     contacts: userInfo.contacts,
      //     // Добавить дополнительные поля
      //     // ...
      //   }

      //   return user
      // },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    signOut: '/',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      console.log(user)
      session.user = token
      session.expires = '123'
      return session
    },
  },
}

export default NextAuth(authOptions)
