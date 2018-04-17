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
            size: 2,
            isHip: true,
            keywords: ['screenprinting', 'design', 'small']
        };
        const company = new Company(data);

        assert.deepEqual(company.toJSON(), { _id: company._id, ...data });
    });
});