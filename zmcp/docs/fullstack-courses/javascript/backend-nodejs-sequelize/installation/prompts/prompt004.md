# prompt 1
si je te donne mes rules eslint

et mon fichier js
et les erreurs

est ce que tu peux reformater mon code


# prompt 2


on commence mon loulou

  {
    rules: {
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-unused-vars": ["warn"],
      "no-console": "off",
      'eqeqeq': 'error',
      'curly': 'error',
      'no-unused-vars': ['error', { 'args': 'none', 'ignoreRestSiblings': true }],
      'no-undef': 'error',
      'no-redeclare': 'error',
      'consistent-return': 'error',
      'no-shadow': 'error',
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'callback-return': 'error',
      'handle-callback-err': ['error', '^.*(e|E)rr'],
      'no-new-require': 'error',
      'no-path-concat': 'error',
      'no-process-exit': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'strict': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-empty': 'error',
      'no-mixed-operators': 'error',
      'no-trailing-spaces': 'error',
      'linebreak-style': 'off',
      'max-len': 'off',
      'no-param-reassign': 'off',
      'prefer-destructuring': 'off',
      'prefer-arrow-callback': 'off',
      'func-names': 'error',
      'arrow-parens': 'off',
      'dot-notation': 'off',
      'import/prefer-default-export': 'off',
      'import/first': 'off',
      'no-template-curly-in-string': 'off',
      'new-cap': ['error', { 'capIsNew': false }],
      'array-callback-return': 'error',
      'object-shorthand': ['error', 'consistent'],
      'function-paren-newline': ['error', 'consistent'],
      'quote-props': ['error', 'as-needed'],
      'operator-linebreak': ['error', 'before'],
      'prefer-template': 'error',
      'id-length': 'error',
      'newline-before-return': 'error',
      'space-before-blocks': 'error',
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
    },
  },



  city-controller.js

  class CityController {
  constructor(service) {
    this.service = service;

    this.getItems = this.getItems.bind(this);
    this.getItemById = this.getItemById.bind(this);
    this.createItem = this.createItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async getItems(req, res, next) {
    try {
      res.locals.data = await this.service.getItems();
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getItemById(req, res, next) {
    try {
      const item = await this.service.getItemById(parseInt(req.params.id));
      if (!item) return next({ status: 404, message: 'City not found' });
      res.locals.data = item;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async createItem(req, res, next) {
    try {
      res.locals.data = await this.service.createItem(req.body);
      res.status(201);
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async updateItem(req, res, next) {
    try {
      const updatedItem = await this.service.updateItem(parseInt(req.params.id), req.body);
      if (!updatedItem) return next({ status: 404, message: 'City not found' });
      res.locals.data = updatedItem;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const deletedItem = await this.service.deleteItem(parseInt(req.params.id));
      if (!deletedItem) return next({ status: 404, message: 'City not found' });
      res.locals.data = deletedItem;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default CityController;


les erreurs eslint

D:\chendra\03-tutorials\12-fullstack\prototypes\backend-javascript\backend-node-javascript-postgresql-sequelize\src\features\city\city-controller.js
  15:7   error  Expected newline before return statement  newline-before-return
  24:18  error  Expected { after 'if' condition           curly
  26:7   error  Expected newline before return statement  newline-before-return
  36:7   error  Expected newline before return statement  newline-before-return
  56:25  error  Expected { after 'if' condition           curly
  58:7   error  Expected newline before return statement  newline-before-return
  56:25  error  Expected { after 'if' condition           curly
  56:25  error  Expected { after 'if' condition           curly
  56:25  error  Expected { after 'if' condition           curly
  58:7   error  Expected newline before return statement  newline-before-return