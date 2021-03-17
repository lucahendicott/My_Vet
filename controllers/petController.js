const Pets = require("../models/pets");

module.exports = {
	getPets: async (req, res) => {
		//verified code works
		Pets.find({})
			.then((dbPets) => res.json(dbPets))
			.catch((err) => res.status(400).json(err));
	},
	getPetsByUser: async (req, res) => {
		//verified code works
		Pets.find({
			ParentID: req.params.id,
		})
			.then((dbPets) => res.json(dbPets))
			.catch((err) => res.status(400).json(err));
	},
	delPet: async (req, res) => {
		Pets.findById({ _id: req.params.id })
			.then((dbPets) => dbPets.remove())
			.then((dbPets) => res.json(dbPets))
			.catch((err) => res.status(422).json(err));
	},
	updatePet: async (req, res) => {
		Pets.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	getPetByID: async (req, res) => {
		Pets.findById(req.params.id)
			.then((dbPets) => res.json(dbPets))
			.catch((err) => res.status(422).json(err));
	},
	createPet: async (req, res) => {
		try {
			const newPet = new Pet({
				PetName: req.body.PetName,
				BirthDate: req.body.BirthDate,
				PetImageLoc: req.body.PetImageLoc,
				Gender: req.body.Gender,
				TypeOfPet: req.body.TypeOfPet,
				Breed: req.body.Breed,
				ParentID: req.user,
			});
			res.json(await newPet.save());
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	},
	addPetMed: (req, res) => {
		Pets.findOneAndUpdate(
			{ _id: req.params.id }, // filter
			{
				$push: {
					Medications: req.body,
				},
			}, //update
			{ new: true } //options
		)
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
	addPetVisit: (req, res) => {
		Pets.findOneAndUpdate(
			{ _id: req.params.id }, // filter
			{
				$push: {
					VetVisits: req.body,
				},
			}, //update
			{ new: true } //options
		)
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
	addPetReminder: (req, res) => {
		Pets.findOneAndUpdate(
			{ 		_id: params.id }, // filter
			{
				$push: {
					Reminders: req.body,
				}
			}, //update
			{ new: true } //options
		)
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
  updatePetMed: async (req, res) => {
    	//findOneAndUpdate(filter, update, options)
      let petId = req.params.id;
      let medId = req.params.medid;
		Pets.findOneAndUpdate(
      { 
		_id: petId, 
		'Medications._id': medId	
      },{
      $set: {
        Medications: req.body
      }})
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
  updatePetVisit: async (req, res) => {
    	//findOneAndUpdate(filter, update, options)
      console.log(req.body);
		Pets.findOneAndUpdate({
			_id: req.params.id, 
			'VetVisits._id': req.params.visitid			   
      },{ 
		$set:{ 'VetVisits.$.VisitDate': req.body.VisitDate,
         'VetVisits.$.VisitNotes': req.body.VisitNotes}},
      { new: true,upsert: true,rawResult: true  }).exec()
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
  findPetVisit: async (req, res) => {
    //findOneAndUpdate(filter, update, options)
    console.log(req.body);
    let petId = req.params.id;
    let visitId = req.params.visitid;
   Pets.findOne({  
    _id: petId, 
    'VetVisits._id': visitId
   	})
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err))
},
delPetVisit: async (req, res) => {
	//findOneAndUpdate(filter, update, options)
  console.log(req.body);
	Pets.findOneAndUpdate({
		_id: req.params.id, 
		'VetVisits._id': req.params.visitid			   
  },{ 
	$pull: 'VetVisits.$'},
  { new: true,upsert: true,rawResult: true  }).exec()
		.then((dbModel) => res.json(dbModel))
		.catch((err) => res.status(422).json(err));
},
};
