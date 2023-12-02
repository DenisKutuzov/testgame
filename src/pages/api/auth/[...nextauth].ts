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
      async profile(profile, tokens) {
        const userInfoResponse = await fetch(
          `https://api.vk.com/method/users.get?fields=email,photo_max,bdate,last_name,city&access_token=${tokens.access_token}&v=5.131`
        )
        const userInfoData = await userInfoResponse.json()
        const userInfo = userInfoData.response[0]
        console.log(userInfoData)
        // Получить дополнительные данные о пользователе VK
        const user = {
          id: userInfo.id,
          name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email,
          image: userInfo.photo_max,
          bday: userInfo.bdate,
          city: userInfo.city,
          // Добавить дополнительные поля
          // ...
        }

        return user
      },
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
