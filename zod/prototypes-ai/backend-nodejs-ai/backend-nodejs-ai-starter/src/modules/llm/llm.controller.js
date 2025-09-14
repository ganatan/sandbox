class LLMController {
  constructor(service) {
    this.service = service
  }

  // getFilmography = async (req, res, next) => {
  //   res.status(404).json({ error: 'getFilmography' })
  // }

  getFilmography = async (req, res, next) => {
    res.status(404).json({ sans: 'getFilmography' })
  // res.locals.data = { process: 'getFilmography' };
  //   next()
}
  
  getFilmographyOld = async (req, res, next) => {
    try {
      const prompt = 'Donne moi la liste des films réalisés par Ridley Scott'
      const result = await this.service.processPrompt(prompt)
      res.locals.data = result
      next()
    } catch (error) {
      next(error)
    }
  }

  getBiography = async (req, res, next) => {
    try {
      const prompt = 'Donne moi la biographie de Ridley Scott'
      const result = await this.service.processPrompt(prompt)
      res.locals.data = result
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default LLMController
