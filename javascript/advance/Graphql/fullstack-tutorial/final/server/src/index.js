// require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const internalEngineDemo = require('./engine-demo');

// creates a sequelize connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  userAPI: new UserAPI({ store }),
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || '';
  const email = new Buffer(auth, 'base64').toString('ascii');

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.users.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return { 
    user: { ...user.dataValues }, 
    // dataSources: dataSources// 如果直接在context中绑定dataSources， 会报错
   };
};
/**
 * node_modules\apollo-server-core\src\runHttpQuery.ts
   const config = {
    schema: options.schema,
    rootValue: options.rootValue,
    context: options.context || {},
    validationRules: options.validationRules,
    executor: options.executor,
    fieldResolver: options.fieldResolver,

    // FIXME: Use proper option types to ensure this
    // The cache is guaranteed to be initialized in ApolloServer, and
    // cacheControl defaults will also have been set if a boolean argument is
    // passed in.
    cache: options.cache!,
    cacheControl: options.cacheControl as
      | CacheControlExtensionOptions
      | undefined,
    dataSources: options.dataSources,
    documentStore: options.documentStore,

    extensions: options.extensions,
    persistedQueries: options.persistedQueries,
    tracing: options.tracing,

    formatError: options.formatError,
    formatResponse: options.formatResponse,

    debug: options.debug,

    plugins: options.plugins || [],
  };

    protected async graphQLServerOptions(
    integrationContextArgument?: Record<string, any>,
  ) {
    let context: Context = this.context ? this.context : {};

    try {
      context =
        typeof this.context === 'function'
          ? await this.context(integrationContextArgument || {})
          : context;
    } catch (error) {
      // Defer context error resolution to inside of runQuery
      context = () => {
        throw error;
      };
    }

    return {
      schema: this.schema,
      plugins: this.plugins,
      documentStore: this.documentStore,
      extensions: this.extensions,
      context,
      // Allow overrides from options. Be explicit about a couple of them to
      // avoid a bad side effect of the otherwise useful noUnusedLocals option
      // (https://github.com/Microsoft/TypeScript/issues/21673).
      persistedQueries: this.requestOptions
        .persistedQueries as PersistedQueryOptions,
      fieldResolver: this.requestOptions.fieldResolver as GraphQLFieldResolver<
        any,
        any
      >,
      parseOptions: this.parseOptions,
      ...this.requestOptions,
    } as GraphQLOptions;
  }

    将dataSources绑定在context中
    function initializeDataSources() {
    if (config.dataSources) {
      const context = requestContext.context;

      const dataSources = config.dataSources();

      for (const dataSource of Object.values(dataSources)) {
        if (dataSource.initialize) {
          dataSource.initialize({
            context,
            cache: requestContext.cache,
          });
        }
      }

      if ('dataSources' in context) {
        throw new Error(
          'Please use the dataSources config option instead of putting dataSources on the context yourself.',
        );
      }

      (context as any).dataSources = dataSources;
    }
  }
 */
// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    ...internalEngineDemo,
  },
  // onHealthCheck: 
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test')
  server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`));

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  LaunchAPI,
  UserAPI,
  store,
  server,
};
