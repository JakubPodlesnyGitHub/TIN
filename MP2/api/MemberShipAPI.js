const MembershipRepository = require('../repository/sequelize/MembershipRepository');

exports.getMemberships = (req, res, next) => {
    MembershipRepository.getMemberships().then(memberShip => {
        res.status(200).json(memberShip);
    }).catch(err => {
        console.log(err);
    });
};

exports.getMembershipById = (req, res, next) => {
    const memberShipId = req.params.membershipId;
    MembershipRepository.getMembershipById(memberShipId).then(memberShip => {
        if (!memberShip) {
            res.status(404).json({
                message: 'Membership with id: ' + memberShipId + ' not found'
            })
        } else {
            res.status(200).json(memberShip);
        }
    });
};

exports.createMembership = (req, res, next) => {
    MembershipRepository.createMembership(req.body).then(newMemberShip => {
        res.status(201).json(newMemberShip);
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateMembership = (req,res,next) => {
    const memberShipId = req.params.membershipId;
    MembershipRepository.updateMebership(memberShipId,req.body).then(result => {
        res.status(200).json({message: 'Membership updated!', memberShip: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteMembership = (req,res,next) =>{
    const memberShipId = req.params.membershipId;
    MembershipRepository.deleteMembership(memberShipId).then(result => {
        res.status(200).json({message: 'Removed mebership: ', memberShip: result})
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};