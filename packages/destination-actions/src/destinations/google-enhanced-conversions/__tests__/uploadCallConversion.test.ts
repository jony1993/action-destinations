import nock from 'nock'
import { createTestEvent, createTestIntegration } from '@segment/actions-core'
import GoogleEnhancedConversions from '../index'

const testDestination = createTestIntegration(GoogleEnhancedConversions)
const timestamp = new Date('Thu Jun 10 2021 11:08:04 GMT-0700 (Pacific Daylight Time)').toISOString()
const customerId = '1234'

describe('GoogleEnhancedConversions', () => {
  describe('uploadCallConversion', () => {
<<<<<<< HEAD
    it('should send an event with default mappings', async () => {
=======
    it('sends an event with default mappings', async () => {
>>>>>>> CONMAN-199
      const event = createTestEvent({
        timestamp,
        event: 'Test Event',
        properties: {
          email: 'test@gmail.com',
          orderId: '1234',
          total: '200',
          currency: 'USD'
        }
      })

      nock(`https://googleads.googleapis.com/v11/customers/${customerId}:uploadCallConversions`)
        .post('')
        .reply(201, { partialFailureError: { code: 0, message: '' }, results: [{}] })

      const responses = await testDestination.testAction('uploadCallConversion', {
        event,
        mapping: { conversion_action: '12345', caller_id: '+1234567890' },
        useDefaultMappings: true,
        settings: {
          customerId
        }
      })

      expect(responses[0].options.body).toMatchInlineSnapshot(
        `"{\\"conversions\\":[{\\"conversionAction\\":\\"customers/1234/conversionActions/12345\\",\\"callerId\\":\\"+1234567890\\",\\"conversionDateTime\\":\\"2021-06-10 18:08:04+00:00\\",\\"conversionValue\\":200,\\"currencyCode\\":\\"USD\\"}],\\"partialFailure\\":true}"`
      )

      expect(responses.length).toBe(1)
      expect(responses[0].status).toBe(201)
    })

<<<<<<< HEAD
    it('should map custom variables correctly', async () => {
=======
    it('maps custom variables correctly', async () => {
>>>>>>> CONMAN-199
      const event = createTestEvent({
        timestamp,
        event: 'Test Event',
        properties: {
          email: 'test@gmail.com',
          orderId: '1234',
          total: '200',
          currency: 'USD'
        }
      })

      nock(`https://googleads.googleapis.com/v11/customers/${customerId}/googleAds:searchStream`)
        .post('')
        .reply(200, [
          {
            results: [
              {
                conversionCustomVariable: {
                  resourceName: 'customers/1234/conversionCustomVariables/123445',
                  id: '123445',
                  name: 'username'
                }
              }
            ]
          }
        ])

      nock(`https://googleads.googleapis.com/v11/customers/${customerId}:uploadCallConversions`)
        .post('')
        .reply(201, { partialFailureError: { code: 0, message: '' }, results: [{}] })

      const responses = await testDestination.testAction('uploadCallConversion', {
        event,
        mapping: { conversion_action: '12345', caller_id: '+1234567890', custom_variables: { username: 'spongebob' } },
        useDefaultMappings: true,
        settings: {
          customerId
        }
      })

      expect(responses[1].options.body).toMatchInlineSnapshot(
        `"{\\"conversions\\":[{\\"conversionAction\\":\\"customers/1234/conversionActions/12345\\",\\"callerId\\":\\"+1234567890\\",\\"conversionDateTime\\":\\"2021-06-10 18:08:04+00:00\\",\\"conversionValue\\":200,\\"currencyCode\\":\\"USD\\",\\"customVariables\\":[{\\"conversionCustomVariable\\":\\"customers/1234/conversionCustomVariables/123445\\",\\"value\\":\\"spongebob\\"}]}],\\"partialFailure\\":true}"`
      )

      expect(responses.length).toBe(2)
      expect(responses[1].status).toBe(201)
    })

<<<<<<< HEAD
    it('should fail if customerId not set', async () => {
=======
    it('fails if customerId not set', async () => {
>>>>>>> CONMAN-199
      const event = createTestEvent({
        timestamp,
        event: 'Test Event',
        properties: {
          email: 'test@gmail.com',
          orderId: '1234',
          total: '200',
          currency: 'USD'
        }
      })

      nock(`https://googleads.googleapis.com/v11/customers/${customerId}:uploadCallConversions`)
        .post('')
        .reply(201, { partialFailureError: { code: 0, message: '' }, results: [{}] })

      try {
        await testDestination.testAction('uploadCallConversion', {
          event,
          mapping: { conversion_action: '12345', caller_id: '+1234567890' },
          useDefaultMappings: true,
          settings: {}
        })
        fail('the test should have thrown an error')
      } catch (e) {
        expect(e.message).toBe('Customer ID is required for this action. Please set it in destination settings.')
      }
    })
  })
})
