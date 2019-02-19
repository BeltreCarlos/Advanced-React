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
  }
}

module.exports = Mutations
