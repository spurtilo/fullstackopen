const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      args.genre
        ? console.log(`GENRE: ${args.genre}`)
        : console.log(`NO GENRE`);

      let query = Book.find();

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        query = query.where({ author: author._id });
      }

      if (args.genre) {
        query = query.where({ genres: args.genre });
      }

      const books = await query.populate('author');
      return books;
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      console.log(args);
      if (!currentUser) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({
          name: args.author,
          born: null,
          bookCount: 1,
        });
      } else {
        author.bookCount++;
      }
      try {
        await author.save();
      } catch (error) {
        if (error.name === 'ValidationError' && error.errors.name) {
          throw new GraphQLError(
            'Author name must be at least 4 characters long.',
            {
              extensions: {
                code: 'BAD_USER_INPUT',
                error: error.message,
              },
            }
          );
        } else {
          throw new GraphQLError('An unexpected error occurred.', {
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
              error: error.message,
            },
          });
        }
      }

      const book = new Book({ ...args, author });
      try {
        await book.save();
      } catch (error) {
        if (error.name === 'ValidationError') {
          console.log(error.errors);

          if (error.errors.title) {
            const kind = error.errors.title.kind;
            const message = error.errors.title.message;

            if (kind === 'minlength') {
              throw new GraphQLError(
                'Book title must be at least 5 characters long.',
                {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                    error: message,
                  },
                }
              );
            } else if (kind === 'unique') {
              throw new GraphQLError(
                'A book with this title and author already exists.',
                {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                    error: message,
                  },
                }
              );
            }
          }
        } else {
          throw new GraphQLError('An unexpected error occurred.', {
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
              error: error.message,
            },
          });
        }
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Error saving book', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            error: error.message,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== '123') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

module.exports = resolvers;
