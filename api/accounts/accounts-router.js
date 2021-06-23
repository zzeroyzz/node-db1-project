const router = require('express').Router()
const Accounts = require('./accounts-model.js')
const mw = require('../accounts/accounts-middleware')

router.get('/',async (req, res, next) => {
 try {
   const data = await Accounts.getAll()
   res.json(data)
 } catch (err) {
   next(err)
 }
})
router.get('/:id', mw.checkAccountId, async (req, res, next) => {
  try{
    const {id} = req.params
    const data = await Accounts.getById(id)
    res.json(data)
  }catch(err){
    next(err)
  }
})



router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
  .then(account=>{
      res.status(201).json(account)
  })
  .catch(error=>{
      next(error)
  })
})

router.put('/:id', mw.checkAccountId,mw.checkAccountPayload, mw.checkAccountId, async(req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body)
    res.json(updatedAccount)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id',mw.checkAccountId, async(req, res, next) => {
  try {
    const deletedAccount = await Accounts.deleteById(req.params.id)
    res.json(deletedAccount)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
