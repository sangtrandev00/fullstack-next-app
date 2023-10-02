import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';
 
console.log({
  clientId: process.env.GOOGLE_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
})

// Dùng mô hình đăng nhập bình thường như thế nào, chỉ local thôi ??? Đăng nhập này dùng mô hình session thôi đúng không ?
// Deploy một sản phẩm ???
// Ứng dụng và tạo một con application MyCV cho bản thân.
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    })
  ],
  callbacks: {
    // Hàm Session để store session trên server (Không sử dụng RestFul API ?)
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session?.user?.email });

      // Something went wrong here. Check it later

      session.user.id = sessionUser._id.toString();

      // Session user nằm ở đâu! Tại sao không thấy nó mà định nghĩa

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile?.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.image,
          });
        }

        return true
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }
