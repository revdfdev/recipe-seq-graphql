import { sign } from 'jsonwebtoken';
import { hash, compare, genSalt } from 'bcrypt'

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return sign({ username, email }, secret, { expiresIn })
}

export default {
  Query: {
    getCurrentUser: async (parent, args, { currentUser, db }, info) => {
      if (!currentUser) {
        console.log("not a current user")
        return null;
      }
      try {
        const user = await db.user.findOne({
          where: {
            username: currentUser.username
          }
        });
        return user;
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    signUpUser: async (root, { username, password, email }, { db }, info) => {
      console.log(username, email, password);
      try {
        const user = await db.user.findOne({
          where: {
            email: email
          }
        })

        if (user) {
          throw new Error("Email already exists");
        }
        const salt = await genSalt(12)
        const hashedPassword = await hash(password, salt);
        const newUser = db.user.create({
          username,
          password: hashedPassword,
          email
        })
        return { token: createToken(newUser, process.env.SECRET, '1hr') }
      } catch (err) {
        throw err;
      }
    },

    signInUser: async (root, { username, password }, { db }, info) => {
      try {
        const user = await db.user.findOne({ where: { username: username } })
        if (!user) throw new Error("User not found");
        const validPassword = await compare(password, user.password);
        if (!validPassword) throw new Error("Invalid password");
        return { token: createToken(user, process.env.SECRET, '1hr') }
      } catch (err) {
        throw err;
      }
    }
  }
}