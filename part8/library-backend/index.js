const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const Author = require('./models/author');
const Book = require('./models/book');

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
  });

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: String
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = Book.find();

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          throw new GraphQLError('Author not found', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
            },
          });
        }
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
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log('ARGS: ', args);
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, bookCount: 1 });
      } else {
        author.bookCount++;
      }
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Error saving author', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            error: error.message,
          },
        });
      }

      const book = new Book({ ...args, author });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError('Error saving book', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            error: error.message,
          },
        });
      }
      return book;
    },
    editAuthor: async (root, args) => {
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
