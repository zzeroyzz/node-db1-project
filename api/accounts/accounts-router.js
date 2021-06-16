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
router.get('/:id', mw.checkAccountId, async(req, res, next) => {
  try {
    const {id} =req.params
    const data = await Accounts.getById(id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', mw.checkAccountPayload, async(req, res, next) => {
 try {
   const newAccount = await Accounts.create(req.body)
   res.status(201).json(newAccount)
 } catch (err) {
   next(err)
 }
})

router.put('/:id', mw.checkAccountPayload, mw.checkAccountId, async(req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body)
    res.json(updatedAccount)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id',mw.checkAccountId, async(req, res, next) => {
  try {
    const deletedAccount = await Accounts.remove(req.params.id)
    res.json(deletedAccount)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
