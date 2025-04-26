'use strict';

const { z: zod } = require('zod');

const createCitySchema = zod.object({
  name: zod.string().min(2, { message: 'Le nom de la ville doit faire au moins 2 caractères.' }),
});

module.exports = { createCitySchema };

// 'use strict';

// const { z } = require('zod');

// const createCitySchema = z.object({
//   name: z.string().min(2, { message: 'Le nom de la ville doit faire au moins 2 caractères.' }),
// });

// module.exports = { createCitySchema };
