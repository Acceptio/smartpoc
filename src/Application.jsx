import React from 'react'
import { SmartContract } from './contracts'
import { getWeb3, initWeb3 } from './blockchain'

class Application extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      addresses: null,

      sellerAddress: '',
      buyerAddress: '',

      comment: 'Something here...',

      contracts: [],
      contractAddress: '',
      contractContent: null
    }

    const makeHandleOnChange = property => e => {
      this.setState({ [property]: e.target.value })
    }

    this.sellerAddressHandleOnChange = makeHandleOnChange('sellerAddress')
    this.buyerAddressHandleOnChange = makeHandleOnChange('buyerAddress')
    this.commentHandleOnChange = makeHandleOnChange('comment')

    this.handleDeployClick = () => {
      getWeb3().then(web3 => {
        const provider = web3.currentProvider

        SmartContract.setProvider(provider)

        SmartContract.new(
          this.state.sellerAddress,
          this.state.buyerAddress,
          this.state.comment,
          {
            from: '0xe6c8c65fa8de4c32e48fa9d0edca3318391396e3', gas: 4700036
          }
        ).then(instance => {
          this.setState(state => ({
            contracts: [...state.contracts, instance.address]
          }))
        })
      })
    }
  }

  async contractAddressHandleOnChange (e) {
    const contractAddress = e.target.value

    this.setState({ contractAddress })

    const web3 = await getWeb3()
    const provider = web3.currentProvider

    SmartContract.setProvider(provider)

    try {
      const contract = await SmartContract.at(contractAddress)

      const sellerAddress = await contract.sellerAddress.call()
      const buyerAddress = await contract.buyerAddress.call()
      const comment = await contract.comment.call()

      this.setState({
        contractContent: {
          sellerAddress,
          buyerAddress,
          comment
        }
      })

    } catch (e) {}
  }

  async componentDidMount () {
    const web3 = await getWeb3()

    web3.eth.getAccounts((error, accounts) => {
      this.setState({
        addresses: accounts,

        sellerAddress: accounts[1] || '',
        buyerAddress: accounts[2] || ''
      })
    })
  }

  render () {
    return (
      <div>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>

        <hr />

        <input type="text" placeholder="Seller address" value={this.state.sellerAddress} onChange={this.sellerAddressHandleOnChange} />
        <input type="text" placeholder="Buyer address" value={this.state.buyerAddress} onChange={this.buyerAddressHandleOnChange} />
        <input type="text" placeholder="Comment" value={this.state.comment} onChange={this.commentHandleOnChange} />

        <button type="button" onClick={this.handleDeployClick}>
          Deploy new smart contract!
        </button>

        <hr />

        <input type="text" placeholder="Contract address" value={this.state.contractAddress} onChange={this.contractAddressHandleOnChange.bind(this)} />
      </div>
    )
  }
}

window.addEventListener('load', initWeb3)

export default Application
