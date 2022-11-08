import type { DestinationDefinition } from '@segment/actions-core'
import type { Settings } from './generated-types'

import sendAssetData from './sendAssetData'

interface RefreshTokenResponse {
  access_token: string
}

const destination: DestinationDefinition<Settings> = {
  name: '1Plusx Asset Api',
  slug: 'actions-1plusx-asset-api',
  mode: 'cloud',

  authentication: {
    scheme: 'oauth2',
    fields: {
      client_name: {
        label: 'Client Name',
        description: 'Your 1plusX Client Name. Please refer to your 1PlusX representative to obtain it.',
        type: 'string',
        required: true
      },
      client_id: {
        label: 'Client ID',
        description: 'Your 1plusX Client ID. Available in 1plusX UI in the "API Keys" section.',
        type: 'string',
        required: true
      },
      client_secret: {
        label: 'Client Secret',
        description: 'Your 1plusX Client Secret. Available in 1plusX UI in the "API Keys" section.',
        type: 'string',
        required: true
      }
    },

    refreshAccessToken: async (request, { settings }) => {
      console.log('refreshAccessToken start')
      // Refresh access token using client_id and client_secret provided in the Settings
      const res = await request<RefreshTokenResponse>('https://ui.1plusx.io/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(settings.client_id + ':' + settings.client_secret)
        },
        body: '{"grant_type":"client_credentials"}'
      })
      console.log('refresh token')
      return { accessToken: res.data.access_token }
    }
  },
  extendRequest({ auth }) {
    console.log('access token ' + auth?.accessToken)
    console.log('extendRequest starts')
    return {
      headers: {
        authorization: `Bearer ${auth?.accessToken}`
      }
    }
  },

  actions: {
    sendAssetData
  }
}

export default destination
