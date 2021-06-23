const Accounts = require('./Accounts-model')
exports.checkAccountPayload = (req, res, next) => {
  try {
    const name = req.body.name
    const budget = req.body.budget
    if (!name || !budget) {
      res.status(400).json({ message: 'name and budget are required' })
    } else if (typeof name !== 'string') {res.status(400).json({ message: 'must be a string' })
    } else if (typeof req.body.budget !== 'number'){res.status(400).json({ message: 'must be a number' })
    } else if (name.trim().length < 3 || name.trim().length > 100) {res.status(400).json({ message: 'between 3 and 100' })
    } else if (budget < 0 || budget > 1000000) {res.status(400).json({ message: 'too large or too small' })
    } else {req.body.name = name.trim()
      next()
    }
  } catch (err){
      next(err)
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const allAccounts = await Accounts.getAll()
  if (allAccounts.some(account=>account.name == req.body.name.trim() && account.id != req.params.id)){
      return res.status(400).json({message:"name is taken"})
  }
  next()
}
exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    if(account){
      req.account = account
      next()
    }else{
      res.status(404).json({ message: "account not found" })
    }
  } catch (err) {
    next(err)
  }
}
