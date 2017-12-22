import Web3 from 'web3'

let web3 = null

const { providers: { HttpProvider } } = Web3
const REMOTE_SERVER_ADDRESS = 'https://1fa66912.ngrok.io'
const HTTP_PROVIDER = new HttpProvider(REMOTE_SERVER_ADDRESS)

export const getWeb3 = () => {
  return new Promise(resolve => {
    if (!web3) {
      web3 = new Web3(HTTP_PROVIDER)

      web3.personal.unlockAccount('0xe6c8c65fa8de4c32e48fa9d0edca3318391396e3', '1234')

      console.log(web3.eth.getBlock('latest'))
    }

    resolve(web3)
  })
}

export { getWeb3 as initWeb3 }
