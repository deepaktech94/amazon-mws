'use strict';
var config = require('../intialize/config');
var accessKey = config.accessKey;
var accessSecret = config.accessSecret;

var chai = require('chai');
var expect = chai.expect;

var amazonMws = require('../../lib/amazon-mws')(accessKey, accessSecret);

describe('Products', function () {

    before(function () {
        expect(accessKey).to.be.a('string');
        expect(accessSecret).to.be.a('string');
    });

    it('It should get offers using GetLowestPricedOffersForASIN Action', async function () {
        var options = {
            'Version': '2011-10-01',
            'Action': 'ListMatchingProducts',
            'SellerId': config.SellerId,
            'MWSAuthToken': config.MWSAuthToken,
            'MarketplaceId': config.MarketplaceId,
            'Query': 'k'
        };
        expect(options.SellerId).to.be.a('string');
        expect(options.MWSAuthToken).to.be.a('string');
        expect(options.MarketplaceId).to.be.a('string');

        var response = await amazonMws.products.searchFor(options);

        expect(response).to.be.a('object');
        expect(response).to.have.property('Products').to.be.a('object');
        expect(response).to.have.property('Products').to.have.property('Product');
        expect(response).to.have.property('ResponseMetadata').to.be.a('object');
        expect(response).to.have.property('ResponseMetadata').to.have.property('RequestId');
        expect(response).to.have.property('Headers').to.be.a('object');
        expect(response).to.have.property('Headers').to.have.property('x-mws-quota-max');
        expect(response).to.have.property('Headers').to.have.property('x-mws-quota-remaining');
        expect(response).to.have.property('Headers').to.have.property('x-mws-quota-resetson');
        expect(response).to.have.property('Headers').to.have.property('x-mws-timestamp');
    });

    it('It should get offers using GetLowestPricedOffersForASIN Action', async function () {
        var options = {
            'Version': '2011-10-01',
            'Action': 'GetLowestPricedOffersForASIN',
            'SellerId': config.SellerId,
            'MWSAuthToken': config.MWSAuthToken,
            'MarketplaceId': config.MarketplaceId,
            'ASIN': config.ASIN,
            'ItemCondition': 'New'
        };
        expect(options.SellerId).to.be.a('string');
        expect(options.MWSAuthToken).to.be.a('string');
        expect(options.MarketplaceId).to.be.a('string');
        expect(options.ASIN).to.be.a('string');

        var response = await amazonMws.products.searchFor(options);

        expect(response).to.be.a('object');
        expect(response).to.have.property('status').to.be.a('string');
        expect(response).to.have.property('Summary').to.be.a('object');
        expect(response).to.have.property('ResponseMetadata').to.be.a('object');
        expect(response).to.have.property('ResponseMetadata').to.have.property('RequestId');
        expect(response).to.have.property('Headers').to.be.a('object');
        expect(response).to.have.property('Headers').to.have.property('x-mws-quota-max');
        expect(response).to.have.property('Headers').to.have.property('x-mws-quota-remaining');
        expect(response).to.have.property('Headers').to.have.property('x-mws-quota-resetson');
        expect(response).to.have.property('Headers').to.have.property('x-mws-timestamp');
    });

    it('It should get my price for ASIN using getMyPriceForASIN Action', async function () {
        var options = {
            'Version': '2011-10-01',
            'Action': 'GetMyPriceForASIN',
            'SellerId': config.SellerId,
            'MWSAuthToken': config.MWSAuthToken,
            'MarketplaceId': config.MarketplaceId,
            'ASINList.ASIN.1': config.ASIN
        };
        expect(options.SellerId).to.be.a('string');
        expect(options.MWSAuthToken).to.be.a('string');
        expect(options.MarketplaceId).to.be.a('string');
        expect(options['ASINList.ASIN.1']).to.be.a('string');

        var response = await amazonMws.products.searchFor(options);

        expect(response).to.be.a('object');
        expect(response).to.have.property('ASIN').to.be.a('string');
        expect(response).to.have.property('status').to.be.a('string');
        expect(response).to.have.property('Product').to.be.a('object');
        expect(response).to.have.property('ResponseMetadata').to.be.a('object');
        expect(response).to.have.property('ResponseMetadata').to.have.property('RequestId');
        expect(response).to.have.property('Headers').to.be.a('object');
        expect(response).to.have.property('Headers').to.have.property('x-mws-quota-max');
        expect(response).to.have.property('Headers').to.have.property('x-mws-quota-remaining');
        expect(response).to.have.property('Headers').to.have.property('x-mws-quota-resetson');
        expect(response).to.have.property('Headers').to.have.property('x-mws-timestamp');
    });

    it('It should NOT get my price for INVALID ASIN using getMyPriceForASIN Action', async function () {
        var options = {
            'Version': '2011-10-01',
            'Action': 'GetMyPriceForASIN',
            'SellerId': config.SellerId,
            'MWSAuthToken': config.MWSAuthToken,
            'MarketplaceId': config.MarketplaceId,
            'ASINList.ASIN.1': undefined
        };
        expect(options.SellerId).to.be.a('string');
        expect(options.MWSAuthToken).to.be.a('string');
        expect(options.MarketplaceId).to.be.a('string');

        try {
            var response = await amazonMws.products.searchFor(options);

            expect(response).to.be.a('object');
            expect(response).to.have.property('ASIN').to.be.a('string');
            expect(response).to.have.property('status').to.be.a('string');
            expect(response).to.have.property('Product').to.be.a('object');
            expect(response).to.have.property('ResponseMetadata').to.be.a('object');
            expect(response).to.have.property('ResponseMetadata').to.have.property('RequestId');
            expect(response).to.have.property('Headers').to.be.a('object');
            expect(response).to.have.property('Headers').to.have.property('x-mws-quota-max');
            expect(response).to.have.property('Headers').to.have.property('x-mws-quota-remaining');
            expect(response).to.have.property('Headers').to.have.property('x-mws-quota-resetson');
            expect(response).to.have.property('Headers').to.have.property('x-mws-timestamp');
        } catch (exception) {
            console.log('exception ', exception);
            expect(exception).to.be.a('object');
            expect(exception).to.have.property('Type').to.be.a('string');
            expect(exception).to.have.property('Message').to.be.a('string');
            expect(exception).to.have.property('Detail').to.be.a('object');
            expect(exception).to.have.property('StatusCode').to.be.a('number');
            expect(exception).to.have.property('RequestId').to.be.a('string');
            expect(exception).to.have.property('Headers').to.be.a('object');
            expect(exception).to.have.property('Headers').to.have.property('x-mws-quota-max');
            expect(exception).to.have.property('Headers').to.have.property('x-mws-quota-remaining');
            expect(exception).to.have.property('Headers').to.have.property('x-mws-quota-resetson');
            expect(exception).to.have.property('Headers').to.have.property('x-mws-timestamp');
        }

    });
});