const { User } = require('./user');
const { Collection } = require('./collection');
const { Item } = require('./item');
const { Comment } = require('./comment');
const { Like } = require('./like');

User.hasMany(Collection);
Collection.belongsTo(User);

Collection.hasMany(Item);
Item.belongsTo(Collection);

User.hasMany(Item);
Item.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Item.hasMany(Comment);
Comment.belongsTo(Item);

Item.hasMany(Like);
Like.belongsTo(Item);

User.hasMany(Like);
Like.belongsTo(User);

module.exports = { User, Collection, Item, Comment, Like };
