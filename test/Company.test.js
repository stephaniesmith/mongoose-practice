const { assert } = require('chai');
const Company = require('../lib/models/Company');

describe('Company model', () => {

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'should give errors');
        return validation.errors;
    };

    it('valid model', () => {
        const data = {
            name: 'Orc.is',
            description: 'Screenprinting',
            type: 'profit',
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

    it('has default date', () => {
        const company = new Company({ name: 'ACL' });
        assert.ok(company.founded);
        assert.isAtMost(company.founded - Date.now(), 5);
    });

    it('required fields', () => {
        const company = new Company({});
        const validation = company.validateSync();
        assert.isDefined(validation, 'should give errors');
        const errors = getValidationErrors(company.validateSync());
        assert.equal(Object.keys(errors).length, 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors['address.state'].kind, 'required');
        assert.equal(errors.size.kind, 'required');
    });

    it('enum, positive size', () => {
        const company = new Company({
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
            size: 0,
            isHip: true,
            keywords: ['screenprinting', 'design', 'small']
        });
        const errors = getValidationErrors(company.validateSync());
        assert.equal(errors['type'].kind, 'enum');
        assert.equal(errors['size'].kind, 'min');
    });
});