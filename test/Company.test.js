const { assert } = require('chai');
const Company = require('../lib/models/Company');

describe('Company model', () => {

    it('valid model', () => {
        const data = {
            name: 'Orc.is',
            description: 'Screenprinting',
            type: 'Manufacturing',
            address: {
                street: '123 Place Street',
                city: 'Walla Walla',
                zip: '97362',
                state: 'WA'
            },
            founded: new Date(),
            size: 2,
            isHip: true,
            keywords: ['screenprinting', 'design', 'small']
        };
        const company = new Company(data);

        assert.deepEqual(company.toJSON(), { _id: company._id, ...data });

        assert.isUndefined(company.validateSync());
    });

    it('required fields', () => {
        const company = new Company({});
        const validation = company.validateSync();
        assert.isDefined(validation, 'should give errors');
        const { errors } = validation;
        assert.equal(Object.keys(errors).length, 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors['address.state'].kind, 'required');
        assert.equal(errors.size.kind, 'required');
    });
});