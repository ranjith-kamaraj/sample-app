let express = require('express');
let { random } = require('lodash');
let router = express.Router();
let customer = require('./models/customer');

const generateUniqueId = () => {
	return `${random(0, 9000000000 - 1) + 1000000000}`
};

router.route('/').get((req, res) => {
	customer.find((err, value) => {
		if (err) {
			console.log(err);
		} else {
			res.json(value);
		}
	});
})

router.route('/getCustomer/:id').get(async (req, res) => {
	const { id } = req.params;

	let record = await customer.findOne({ id }).lean();

	if (!record) {
		res.json(`Record not found for Id: ${id}`);
	} else {
		res.json(record);
	}
});


router.route('/addCustomer').post(async (req, res) => {

	const { name, gender, amount, loanTenure } = req.body;
	let customerDetails = new customer({
		id: generateUniqueId(),
		name,
		gender,
		amount,
		loanTenure
	});
	
	await customerDetails.save();
	res.json('succesfully added')
});

router.route('/updateCustomer/:id').put(async (req, res) => {
	const { id } = req.params;
	const { name, gender, amount, loanTenure } = req.body;

	await customer.updateOne({ id }, {
		"$set": {
			name,
			gender,
			amount,
			loanTenure
		}
	})
	res.json('succesfully updated')
});

router.route('/deleteCustomer/:id').delete(async (req, res) => {
	const { id } = req.params;
	await customer.deleteOne({ id })
	res.json('succesfully deleted')
});

module.exports = router;