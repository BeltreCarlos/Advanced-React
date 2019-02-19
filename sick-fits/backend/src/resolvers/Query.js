const { forwardTo } = require('prisma-binding')

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  // Metadata about the type like pageInfo, count, etc...
  itemsConnection: forwardTo('db')
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items()

  //   return items
  // }
}

module.exports = Query
