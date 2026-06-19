'use strict'

// Declarations for entities defined in other scripts
let React
let PropTypes
let fx

let SelectorInput
let TxtInput
let MainData

let toMoney
let toNumeric

// Money is the http://openexchangerates.github.io/money.js/#playground Lib
const Money = fx.noConflict()
//  Become true if money conv is configured and connected correctly
let MoneyEnable = false

class CurrencySelect extends React.Component {
  constructor (props) {
    super(props)
    this.handleCurChange = this.handleCurChange.bind(this)
    const selectable = MainData.Conv.slice(0)
    selectable.unshift(MainData.Currency)
    this.state = {
      Enable: false,
      SelectCur: '0',
      Cur: selectable[0],
      Selectable: selectable,
      prevselec: -1
    }
    this.moneyset(0)
  }

  moneyset (select) {
    Money.settings =
            {
              from: MainData.Currency,
              to: this.state.Selectable[select]
            }
  }

  handleCurChange (select) {
    if (select === '0') {
      this.setState({ Enable: false })
    } else {
      this.setState({ Enable: true })
    }
    this.setState({ SelectCur: select })
    this.setState({ Cur: this.state.Selectable[select] })
    this.moneyset(select)
  }

  componentDidUpdate () {
    if (this.state.prevselec !== this.state.SelectCur) {
      this.props.money({ Enable: this.state.Enable, Cur: this.state.Cur })
      this.setState({ prevselec: this.state.SelectCur })
    }
  }

  render () {
    if (!this.props.ratesLoaded) {
      return <small className="form-text text-muted">Loading exchange rates...</small>
    }
    if (!MoneyEnable) return null
    
    let r = 0
    let rate = null
    // only display the module if conversion is enable and running ok
    if (MoneyEnable) {
      if (this.state.Enable) {
        r = Money.convert(1).toFixed(2)
        rate = '1' + MainData.Currency + '=' + r + this.state.Cur
      }
      return (
                    <SelectorInput id={this.props.id + '-currency'} name="Change Currency" options={this.state.Selectable}
                                   rate={rate} class="btn-secondary" selected={this.state.SelectCur}
                                   onChange={this.handleCurChange} tips="You can display another currency, actual rate is automatically applied"/>
      )
    } else {
      return (null)
    }
  }
}

CurrencySelect.propTypes = {
  id: PropTypes.string,
  money: PropTypes.func
}

class PluginsCurrencyChange extends React.Component {
  constructor (props) {
    super(props)
    this.handleCurChange = this.handleCurChange.bind(this)
    this.handleCostChange = this.handleCostChange.bind(this)
    const selectable = MainData.Conv.slice(0)
    selectable.unshift(MainData.Currency)
    this.state = {
      Enable: false,
      SelectCur: '0',
      Cur: selectable[0],
      Selectable: selectable,
      prevvalue: -1,
      CostError: false,
      value: 0
    }
  }

  handleCurChange (select) {
    if (select === '0') {
      this.setState({ Enable: false })
    } else {
      this.setState({ Enable: true })
    }
    this.setState({ SelectCur: select })
    this.setState({ Cur: this.state.Selectable[select] })
    this.setState({ prevvalue: -1 })
  }

  handleCostChange (value) {
    value = value.replace(/ /g, '')
    if (isNaN(value) || value === '' || typeof value === 'number') {
      this.setState({ CostError: true })
      value = 0
    } else {
      this.setState({ CostError: false })
    }
    this.setState({ value })
  }

  makecost () {
    let value = this.state.value
    // Convert money from another currency to the main if needed
    if (this.state.Enable) {
      value = Money(value).from(this.state.Cur).to(MainData.Currency)
    }
    // Send the value to parent plugin
    this.props.onCostChange(value)
  }

  componentDidUpdate () {
    if (this.state.prevvalue !== this.state.value) {
      this.makecost()
      this.setState({ prevvalue: this.state.value })
    }
  }

  selector () {
    if (MoneyEnable) {
      return (
            <div className="ConvUser">
                <SelectorInput id={this.props.id + '-currency'} name={null}
                                                     options={this.state.Selectable}
                                                     rate={null} class="btn-secondary" selected={this.state.SelectCur}
                                                     onChange={this.handleCurChange}/>
            </div>
      )
    } else {
      return (MainData.Currency)
    }
  }

  classtxt (error) {
    if (error) {
      return 'is-invalid'
    } else {
      return 'is-valid'
    }
  }

  render () {
    let r = 0
    let rate = ''
    if (this.state.Enable) {
      r = Money(1.00).from(this.state.Cur).to(MainData.Currency).toFixed(2)
      rate = '1' + this.state.Cur + '=' + r + MainData.Currency
    }
    return (
                    <TxtInput id={this.props.id + '-input'} name={this.props.name} placeholder="Cost" tips="Add your own cost calculation here" onChange={this.handleCostChange}
                              class={this.classtxt(this.state.CostError)} Prepend={this.selector()} info={rate} className="input-group-lg"
                              InvalidMessage="Please provide a correct numerical value" />
    )
  }
}

PluginsCurrencyChange.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onCostChange: PropTypes.func
}

// This function convert the input (ie numnber or string) to the converted currency
function ConvCurrency (mainCurrency) {
  return toMoney(Money.convert(toNumeric(mainCurrency)), Money.settings.to)
}

// Init function for downloading the rate from Open Exchange Rates
function MoneyGetRates (onDone) {
  console.log('entering MoneyGetRates ()')
  if (MainData.OEXRApi !== '') {
    fetch('https://openexchangerates.org/api/latest.json?app_id=' + MainData.OEXRApi)
      .then(r => r.json())
      .then(data => {
        Money.rates = data.rates
        Money.base = data.base
        MoneyEnable = true
        console.log('we have received exchange rates, moving on')
        onDone()
      })
      .catch(() => {
        MoneyEnable = false
        onDone()
      })
  } else {
    onDone()
  }
}
