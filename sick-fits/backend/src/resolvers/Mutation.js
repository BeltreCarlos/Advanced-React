const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SALT_LENGTH = 10

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO check if they're logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    )

    return item
  },

  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args }
    // remove the ID from the updates
    delete updates.id
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    )
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }
    // 1. Find the item
    const item = await ctx.db.query.item({ where }, `{ id title }`)
    // 2. Check if they have permissions
    // TODO
    // 3. Delete It!
    return ctx.db.mutation.deleteItem({ where }, info)
  },

  async signup(parent, args, ctx, info) {
    // lowercase the user email
    args.email = args.email.toLowerCase()
    // hash the password
    const password = await bcrypt.hash(args.password, SALT_LENGTH)
    // create the user in the db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] }
        }
      },
      info
    )
    // create the JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    // Set the jwt as a cookie on the response
    // httpOnly prevents JS from accessing token in the frontend
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    })

    return user
  },

  async signin(parent, { email, password }, ctx, info) {
    // check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email ${email}`)
    }
    // check if the password is correct
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid Password!')
    }
    // generate the jwt token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    })

    return user
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token')

    return { message: 'Goodbye!' }
  }
}

module.exports = Mutations
