'use strict'

let projectname = ''
let projectduration = 0

// Declarations for entities defined in other scripts
let MainData
let Stats
let MoneyEnable
let MoneyGetRates
let ConvCurrency

let PluginsCurrencyChange
let PopupStats
let ManageExport
let CurrencySelect

let _paq

let React
let ReactDOM
let PropTypes

// Functions Tools
// ---------------------
// ---------------------
// function loop for react js
function Repeat (props) {
  const items = []
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i))
  }
  return <div>{items}</div>
}

Repeat.propTypes = {
  numTimes: PropTypes.number,
  children: PropTypes.func
}

// convert string to numeric
function toNumeric (value) {
  return parseFloat(
    value.toString().replace(/[^0-9\\.]+/g, '')
  )
}

// Covert numeric to money string
function toMoney (numeric, currency) {
  if (typeof numeric === 'string') {
    numeric = parseFloat(numeric)
  }
  let strcur = ''
  if (currency === undefined) {
    strcur = MainData.Currency
  } else {
    strcur = currency
  }
  return numeric.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + strcur
}

// return the sum of an array
function sum (obj) {
  const val = Object.values(obj)
  let total = 0
  for (let i = 0; i < val.length; i++) {
    total = total + toNumeric(val[i])
  }
  return total
}

// Comapare two obj return true is similar
Object.compare = function (obj1, obj2) {
  // console.log('in Object.compare', obj1, obj2)
  if (typeof (obj1) === 'undefined' && typeof (obj2) === 'undefined') {
    return true
  }
  if (typeof (obj1) === 'undefined' || typeof (obj2) === 'undefined') {
    return false
  }
  // Loop through properties in object 1
  for (const p in obj1) {
    // Check property exists on both objects
    // if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false
    if (Object.prototype.hasOwnProperty.call(obj1, p) !== Object.prototype.hasOwnProperty.call(obj2, p)) return false

    switch (typeof (obj1[p])) {
      // Deep compare objects
      case 'object':
        if (!Object.compare(obj1[p], obj2[p])) return false
        break
        // Compare function code
      case 'function':
        if (typeof (obj2[p]) === 'undefined' || (p !== 'compare' && obj1[p].toString() !== obj2[p].toString())) return false
        break
        // Compare values
      default:
        if (obj1[p] !== obj2[p]) return false
    }
  }

  // Check object 2 for any extra properties
  for (const p in obj2) {
    if (typeof (obj1[p]) === 'undefined') return false
  }
  return true
}
// Generate a random int
function randomInt (not) {
  let rnd
  let cont
  do {
    rnd = Math.floor(Math.random() * 100)
    cont = false
    for (let i = 0; i < not.length; i++) {
      if (not[i] === rnd) {
        cont = true
      }
    }
  } while (cont)
  return rnd
}

// Inputs Definition
// ---------------------
// ---------------------
// Display the amount selector
class AmountInput extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onChange(e.target.value)
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentDidUpdate () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentWillUnmount () {
    $('[data-toggle="tooltip"]').tooltip('dispose')
  }

  render () {
    const value = this.props.value
    let label = null
    if (this.props.name != null && this.props.name !== '') {
      label = <label htmlFor={this.props.id}> {this.props.name} </label>
    }
    return (
            <div className="col">
              <span data-toggle="tooltip" data-placement="top" title={this.props.tips}>
                {label}
                <input type="range" className="form-control-range" id={this.props.id} min={this.props.min} max={this.props.max}
                       step={this.props.step} value={value} onChange={this.handleChange}/>
                <small id="nas-amount-cost" className="form-text text-muted">{this.props.name} : {value} {this.props.unit} </small>
              </span>
            </div>
    )
  }
}

AmountInput.propTypes = {
  onChange: PropTypes.func,
  tips: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  step: PropTypes.string,
  unit: PropTypes.string
}

// Display a select input box
class SelectorInput extends React.Component {
  constructor (props) {
    super(props)
    // this.state={listoptions:this.makelist(props.options)};
    this.handleChange = this.handleChange.bind(this)
  }

  rate (i) {
    return i
  }

  makelist (data) {
    const listoptions = []

    for (let i = 0; i < data.length; i++) {
      listoptions.push(<button className="dropdown-item btn-success " type="button" key={i} value={this.rate(i)} onClick={this.handleChange}>{data[i]}</button>)
    }
    return listoptions
  }

  handleChange (select) {
    this.props.onChange(select.target.value)
  }

  makerate () {
    if (this.props.rate != null && this.props.rate !== '') {
      return (<div className="row"> <small id="rate-amount-cost" className="form-text text-muted">Rate : {this.props.rate}  {this.props.unit}</small></div>)
    }
  }

  maketitle (title) {
    const maxstr = 20
    if (title.length > maxstr) {
      title = title.substr(0, maxstr) + '...'
    }
    return title
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentDidUpdate () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentWillUnmount () {
    $('[data-toggle="tooltip"]').tooltip('dispose')
  }

  render () {
    let label = null
    if (this.props.name != null && this.props.name !== '') {
      label = <div className="row"><label htmlFor={this.props.id}> {this.props.name} </label></div>
    }
    return (
            <div className="Container">
              {label}
              <div className="row">
                <div className="btn-group">
                  <a className={'btn ' + this.props.class + ' dropdown-toggle'} href="#" role="button" id={this.props.id} data-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false" >
                    <span data-toggle="tooltip" data-placement="top" title={this.props.tips}>
                      {this.maketitle(this.props.options[this.props.selected])}
                    </span>
                  </a>
                <div className="dropdown-menu" aria-labelledby={this.props.id}>
                  {this.makelist(this.props.options)}
              </div>
             </div>
            </div>
                {this.makerate()}
            </div>
    )
  }
}

SelectorInput.propTypes = {
  onChange: PropTypes.func,
  tips: PropTypes.string,
  rate: PropTypes.number,
  unit: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  class: PropTypes.string,
  options: PropTypes.array,
  selected: PropTypes.string
}

// Make the read more button
class MakeknowmoreInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { btnsize: 20 }
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentDidUpdate () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentWillUnmount () {
    $('[data-toggle="tooltip"]').tooltip('dispose')
  }

  render () {
    const data = this.props.data
    if (((data.Url !== ''))) {
      // if (data.Url.length==1){
      //     return(
      //         <ButtonHrefInput name={<img src="./icon/info.png" width={this.state.btnsize}/>} url={data.Url[0].Url}
      //     id="btn-plugin-knowmore"
      // class="btn-primary btn-sm" tips={"Know more about " + data.Name}/>
      //     );
      // }else {
      return (<MenuInput name={<img src="./icon/info.png" width={this.state.btnsize}/>} options={data.Url}
                               id="btn-plugin-knowmore"
                               class="btn-primary btn-sm" tips={'Read more about ' + data.Name + ' solutions'}/>)
      // }
    } else {
      return null
    }
  }
}

MakeknowmoreInput.propTypes = {
  data: PropTypes.object
}

// Display a checkbox
class CheckboxInput extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = { checked: this.props.defaults }
  }

  handleChange () {
    this.setState({ checked: !this.state.checked })
    this.props.onChange(!this.state.checked)
  }

  render () {
    return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id={this.props.id} onChange={this.handleChange}
                       defaultChecked={this.state.checked}/>
                    <label className="form-check-label" htmlFor={this.props.id}>{this.props.name}</label>
            </div>
    )
  }
}

CheckboxInput.propTypes = {
  defaults: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
}

// Display a btn with link
class ButtonHrefInput extends React.Component {
  /*
  constructor (props) {
    super(props)
  }
  */

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentDidUpdate () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  render () {
    return (
            <a id={this.props.id} href={this.props.url} type="button" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title={this.props.tips} aria-disabled="true" target="_blank" rel="noreferrer">{this.props.name}</a>
    )
  }
}

ButtonHrefInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  tips: PropTypes.string
}

// Button with validation popup
class ButtonInputWpop extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = { target: 'Modal' + this.props.idp }
  }

  handleChange () {
    const out = { n: this.props.n, target: this.state.target }
    this.props.onClick(out)
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentDidUpdate () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentWillUnmount () {
    $('[data-toggle="tooltip"]').tooltip('dispose')
  }

  render () {
    return (
            <span data-toggle="tooltip" data-placement="top" title={this.props.tips}>
              <button type="button" className={'btn ' + this.props.class} id={this.props.id} data-toggle="modal" data-target={'#' + this.state.target}>
                {this.props.name}
              </button>

              <div className = "modal fade" id = {this.state.target} tabIndex = "-1" role = "dialog" >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" >Are you sure you want to suppress this line ?</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      You are removing a item. Please confirm you want to suppress : {this.props.info}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-danger" onClick={this.handleChange}>Yes I want to remove it</button>
                    </div>
                  </div>
                </div>
              </div>
            </span>
    )
  }
}

ButtonInputWpop.propTypes = {
  n: PropTypes.number,
  idp: PropTypes.string,
  id: PropTypes.string,
  class: PropTypes.string,
  name: PropTypes.object,
  info: PropTypes.string,
  tips: PropTypes.string,
  onClick: PropTypes.func
}
// Display a button
class ButtonInput extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange () {
    this.props.onClick(this.props.n)
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentDidUpdate () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentWillUnmount () {
    $('[data-toggle="tooltip"]').tooltip('dispose')
  }

  render () {
    return (
            <span>
              <button id={this.props.id} onClick={this.handleChange} type="button"
                      className={'btn ' + this.props.class} data-toggle="tooltip" data-placement="top" title={this.props.tips}>
                {this.props.name}
              </button>
            </span>
    )
  }
}

ButtonInput.propTypes = {
  n: PropTypes.string,
  id: PropTypes.string,
  class: PropTypes.string,
  name: PropTypes.object,
  tips: PropTypes.string,
  info: PropTypes.string,
  onClick: PropTypes.func
}

// Display a menu
class MenuInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { listoptions: this.makelist(props.options) }
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentDidUpdate () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentWillUnmount () {
    $('[data-toggle="tooltip"]').tooltip('dispose')
  }

  makelist (data) {
    const listoptions = []
    for (let i = 0; i < data.length; i++) {
      listoptions.push(<a className="dropdown-item" href={data[i].Url} key={data[i].Name} target="_blank" rel="noreferrer">{data[i].Name}</a>)
    }
    return listoptions
  }

  render () {
    return (
            <div className="btn-group">
              <a className={'btn ' + this.props.class + ' btn-sm dropdown-toggle'} href="#" role="button" id={this.props.id} data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false" >
                <span data-toggle="tooltip" data-placement="top" title={this.props.tips}>
                    {this.props.name}
                </span>
              </a>
              <div className="dropdown-menu" aria-labelledby={this.props.id}>
                {this.state.listoptions}
              </div>
            </div>
    )
  }
}

MenuInput.propTypes = {
  id: PropTypes.string,
  class: PropTypes.string,
  name: PropTypes.object,
  tips: PropTypes.string,
  options: PropTypes.array,
  listoptions: PropTypes.array
}

// Text input box
class TxtInput extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onChange(e.target.value)
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentDidUpdate () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentWillUnmount () {
    $('[data-toggle="tooltip"]').tooltip('dispose')
  }

  render () {
    let info = null
    if (this.props.info != null && this.props.info !== '') info = <small id={this.props.id + '-info'} className="input-group-text">{this.props.info} </small>
    return (
            <span data-toggle="tooltip" data-placement="top" title={this.props.tips}>
              <label htmlFor={this.props.id}> {this.props.name} </label>
              <div className={'input-group ' + this.props.className}>
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend2">{this.props.Prepend}</span>
                </div>
                <input type="text" className={'form-control ' + this.props.class} id={this.props.id} placeholder={this.props.placeholder} onChange={this.handleChange} value={this.props.value} />
                  {info}
                <div className="invalid-feedback">
                  {this.props.InvalidMessage}
                </div>
              </div>
            </span>
    )
  }
}

TxtInput.propTypes = {
  id: PropTypes.string,
  class: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  Prepend: PropTypes.object,
  tips: PropTypes.string,
  info: PropTypes.string,
  InvalidMessage: PropTypes.string,
  onChange: PropTypes.func
}

// Outputs definition
// ---------------------
// ---------------------
// Display the cost output box
class CostOutput extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange () {
    this.props.onCostChange(this.props.display)
  }

  componentDidMount () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  componentDidUpdate () {
    $('[data-toggle="tooltip"]').tooltip()
  }

  render () {
    const classN = 'form-control ' + this.props.class
    return (
            <div className={'form-group row align-items-center'}>
              <label htmlFor={this.props.id} className={'col-form-label'}>{this.props.name}</label>
              <div className="col align-self-center">
                <input type={'text'} id={this.props.id} className={classN}
                       value={this.props.value} onChange={this.handleChange} readOnly data-toggle="tooltip" data-placement="top" title={this.props.tips}/>
              </div>
            </div>
    )
  }
}

CostOutput.propTypes = {
  id: PropTypes.string,
  class: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  tips: PropTypes.string,
  display: PropTypes.string,
  onCostChange: PropTypes.func
}

// Display a text box for display
function Textoutput (props) {
  return (
        <div className="alert alert-primary" role="alert" data-toggle="tooltip" data-placement="top" title="Expand this...">
          {props.text}
        </div>
  )
}

Textoutput.propTypes = {
  text: PropTypes.string
}
// Plugins definition
// ---------------------
// ---------------------
class AmountRatesCost extends React.Component {
  constructor (props) {
    super(props)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleRateChange = this.handleRateChange.bind(this)
    this.state = {
      Amount: '1',
      SelectRate: '0',
      Rate: this.props.data.Rates[Object.keys(this.props.data.Rates)[0]],
      Adaptive: false

    }
    if (typeof this.props.data.Adaptive !== 'undefined' && this.props.data.Adaptive === true) {
      this.state.Adaptive = true
    }
    this.makeExport()
  }

  handleAmountChange (amount) {
    this.setState({ Amount: amount })
  }

  handleRateChange (select) {
    this.setState({ SelectRate: select })
    this.setState({ Rate: this.props.data.Rates[Object.keys(this.props.data.Rates)[select]] })
  }

  makeExport () {
    this.export = [
      { Name: 'Amount', Value: this.state.Amount + ' ' + this.props.data.AmountUnit },
      { Name: this.props.data.RateName, Value: Object.keys(this.props.data.Rates)[this.state.SelectRate] }
    ]
    this.props.export(this.export)
  }

  componentDidUpdate () {
    this.makeCost(this.state.Amount, this.state.Rate)
    this.makeExport()
  }

  render () {
    let AmountMin
    let AmountMax
    let AmountStep
    if (this.state.Adaptive) {
      AmountMin = this.props.data.AmountMin[this.state.SelectRate]
      AmountMax = this.props.data.AmountMax[this.state.SelectRate]
      AmountStep = this.props.data.AmountStep[this.state.SelectRate]
    } else {
      AmountMin = this.props.data.AmountMin
      AmountMax = this.props.data.AmountMax
      AmountStep = this.props.data.AmountStep
    }
    if (this.state.Amount > AmountMax) {
      this.setState({ Amount: AmountMax })
    }
    if (this.state.Amount < AmountMin) {
      this.setState({ Amount: AmountMin })
    }
    return (
            <div className="row align-items-center">
              <div className="col">
                <AmountInput id={this.props.id} min={AmountMin.toString()} max={AmountMax.toString()}
                             step={AmountStep.toString()} value={this.state.Amount.toString()} name={this.props.data.AmountName}
                             unit={this.props.data.AmountUnit} onChange={this.handleAmountChange} tips="Select the desired amount"/>
              </div>
              <div className="col-3">
                <SelectorInput id={this.props.id + '-Rates'} name={this.props.data.RateName} options={Object.keys(this.props.data.Rates)}
                               class="btn-secondary" selected={this.state.SelectRate} rate={this.state.Rate}
                               unit={this.props.data.RateUnit} onChange={this.handleRateChange} />
              </div>
            </div>
    )
  }

  makeCost (amount, rate) {
    let free
    if (this.state.Adaptive) {
      free = this.props.data.AmountFree[this.state.SelectRate]
    } else {
      free = this.props.data.AmountFree
    }

    let total = (amount - free) * rate
    if (this.props.data.ByYear) total = total * projectduration
    total = toMoney(total)
    this.props.onCostChange(this.props.n, total)
    return total
  }
}

AmountRatesCost.propTypes = {
  id: PropTypes.string,
  n: PropTypes.number,
  data: PropTypes.object,
  export: PropTypes.func,
  onCostChange: PropTypes.func
}

class CategoryAmountRatesCost extends React.Component {
  constructor (props) {
    super(props)
    this.handleCatChange = this.handleCatChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleRateChange = this.handleRateChange.bind(this)
    // console.log('in constructor', this.props.data.Rates)
    this.state = {
      SelectCat: '0',
      Cat: this.props.data.Cat[Object.keys(this.props.data.Cat)[0]],
      Amount: 0,
      SelectRate: '0',
      Rate: this.props.data.Rates[Object.keys(this.props.data.Rates)[0]],
      Free: 0,
      Adaptive: false
    }
    if (typeof this.props.data.Adaptive !== 'undefined' && this.props.data.Adaptive === true) {
      this.state.Adaptive = true
    }
    this.makeExport()
  }

  handleAmountChange (amount) {
    this.setState({ Amount: amount })
  }

  handleRateChange (select) {
    this.setState({ SelectRate: select })
    this.setState({ Rate: this.props.data.Rates[Object.keys(this.props.data.Rates)[select]] })
  }

  handleCatChange (select) {
    this.setState({ SelectCat: select })
    this.setState({ Cat: this.props.data.Cat[Object.keys(this.props.data.Cat)[select]] })
  }

  makeExport () {
    this.export = [
      { Name: this.props.data.CatName, Value: Object.keys(this.props.data.Cat)[this.state.SelectCat] },
      { Name: 'Amount', Value: this.state.Amount + ' ' + this.props.data.AmountUnit },
      { Name: this.props.data.RateName, Value: Object.keys(this.props.data.Rates)[this.state.SelectRate] }
    ]
    this.props.export(this.export)
  }

  componentDidUpdate () {
    this.makeCost(this.state.Cat, this.state.Amount, this.state.Rate, this.state.Free)
    this.makeExport()
  }

  render () {
    let AmountMin
    let AmountMax
    let AmountStep
    // let AmountFree
    if (this.state.Adaptive) {
      // console.log('this.props.data.AmountMin', this.props.data.AmountMin, 'this.props.data.AmountMax', this.props.data.AmountMax, ' selected rate', this.state.SelectRate)
      AmountMin = this.props.data.AmountMin[this.state.SelectRate]
      AmountMax = this.props.data.AmountMax[this.state.SelectRate]
      AmountStep = this.props.data.AmountStep[this.state.SelectRate]
      // AmountFree = this.props.data.AmountFree[this.state.SelectRate]
    } else {
      AmountMin = this.props.data.AmountMin
      AmountMax = this.props.data.AmountMax
      AmountStep = this.props.data.AmountStep
      // AmountFree = this.props.data.AmountFree
    }
    if (this.state.Amount > AmountMax) {
      this.setState({ Amount: AmountMax })
    }
    if (this.state.Amount < AmountMin) {
      this.setState({ Amount: AmountMin })
    }
    // console.log('in render()', this.state.SelectRate, AmountMin, AmountMax, AmountStep, AmountFree)
    return (
            <div className="row align-items-center">
              <div className="col-3">
                <SelectorInput id={this.props.id + '-category'} name={this.props.data.CatName} options={Object.keys(this.props.data.Cat)} rate={this.state.Cat}
                               class="btn-secondary" selected={this.state.SelectCat} unit={this.props.data.CatUnit} onChange={this.handleCatChange} />
              </div>

              <div className="col-4">
                <AmountInput id={this.props.id} min={AmountMin.toString()} max={AmountMax.toString()} step={AmountStep.toString()}
                             value={this.state.Amount.toString()} name={this.props.data.AmountName} unit={this.props.data.AmountUnit} onChange={this.handleAmountChange} />
              </div>
              <div className="col-4">
                <SelectorInput id={this.props.id + '-Rates'} name={this.props.data.RateName} options={Object.keys(this.props.data.Rates)} rate={this.state.Rate}
                                   class="btn-secondary" selected={this.state.SelectRate} unit={this.props.data.RateUnit} onChange={this.handleRateChange} />
              </div>
            </div>
    )
  }

  makeCost (cat, amount, rate, free) {
    let total = cat + (amount - free) * rate
    // console.log(cat, '+ (', amount, '-',free,')*', rate, ' = ', total)
    if (this.props.data.ByYear) total = total * projectduration

    total = toMoney(total)
    this.props.onCostChange(this.props.n, total)
    return total
  }
}

CategoryAmountRatesCost.propTypes = {
  id: PropTypes.string,
  n: PropTypes.number,
  data: PropTypes.object,
  export: PropTypes.func,
  onCostChange: PropTypes.func
}

class CategoryCost extends React.Component {
  constructor (props) {
    super(props)
    this.handleCatChange = this.handleCatChange.bind(this)

    this.state = {
      SelectCat: '0',
      Cat: this.props.data.Cat[Object.keys(this.props.data.Cat)[0]]
    }
    this.makeExport()
  }

  handleCatChange (select) {
    this.setState({ SelectCat: select })
    this.setState({ Cat: this.props.data.Cat[Object.keys(this.props.data.Cat)[select]] })
  }

  makeExport () {
    this.export = [
      { Name: this.props.data.CatName, Value: Object.keys(this.props.data.Cat)[this.state.SelectCat] }
    ]
    this.props.export(this.export)
  }

  componentDidUpdate () {
    this.makeCost(this.state.Cat)
    this.makeExport()
  }

  render () {
    return (
            <div className="row align-items-center">
                <div className="col-4">
                    <SelectorInput id={this.props.id + '-category'} name={this.props.data.CatName} options={Object.keys(this.props.data.Cat)} rate={this.state.Cat}
                                   class="btn-secondary" selected={this.state.SelectCat} unit={this.props.data.CatUnit} onChange={this.handleCatChange} />

                </div>
            </div>
    )
  }

  makeCost (cat) {
    let total = cat
    if (this.props.data.ByYear) total = total * projectduration

    total = toMoney(total)
    this.props.onCostChange(this.props.n, total)
    return total
  }
}

CategoryCost.propTypes = {
  id: PropTypes.string,
  n: PropTypes.number,
  data: PropTypes.object,
  export: PropTypes.func,
  onCostChange: PropTypes.func,
  onChange: PropTypes.func
}

class NoneSelect extends React.Component {
  constructor (props) {
    super(props)
    this.export = []
    const Cost = toMoney(0)
    this.props.onCostChange(this.props.n, Cost)
    this.props.export(this.export)
  }

  render () {
    /*
    const Cost = toMoney(0)
    this.props.onCostChange(this.props.n, Cost)
    this.props.export(this.export)
    */

    return (<div className="alert alert-info" id="infotxt">
                Please select a provider in the list.
            </div>
    )
  }
}

NoneSelect.propTypes = {
  n: PropTypes.number,
  export: PropTypes.func,
  onCostChange: PropTypes.func,
  onChange: PropTypes.func
}

class UserCost extends React.Component {
  constructor (props) {
    super(props)
    this.handleCostChange = this.handleCostChange.bind(this)
    this.handleProviderChange = this.handleProviderChange.bind(this)
    this.handleServiceChange = this.handleServiceChange.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleConvMoneyChange = this.handleConvMoneyChange.bind(this)

    this.state = {
      total: 0,
      value: 0,
      ProviderError: true,
      ServiceError: true,
      ByYear: false
    }
    this.export = []
  }

  handleYearChange (state) {
    this.setState({ ByYear: state })
    this.props.handlebyYearChange(state)
  }

  makeCost (byYear, amount) {
    let total = amount
    if (byYear) total = amount * projectduration
    //       this.setState({total:total});
    this.props.onCostChange(this.props.n, toMoney(total))
    return toMoney(total)
  }

  handleCostChange (value) {
    this.setState({ value })
  }

  handleProviderChange (txt) {
    this.props.handleProviderChange(txt)
    if (txt === '') {
      this.setState({ ProviderError: true })
    } else {
      this.setState({ ProviderError: false })
    }
  }

  handleServiceChange (txt) {
    this.props.handleServiceChange(txt)
    if (txt === '') {
      this.setState({ ServiceError: true })
    } else {
      this.setState({ ServiceError: false })
    }
  }

  handleConvMoneyChange (conv) {
    this.setState({ conv })
  }

  componentDidUpdate () {
    this.makeCost(this.state.ByYear, this.state.value)
    // this.makeExport();
  }

  classtxt (error) {
    if (error) {
      return 'is-invalid'
    } else {
      return 'is-valid'
    }
  }

  render () {
    let Costname = 'Cost'
    if (this.state.ByYear) Costname = 'Cost by year'
    this.props.export(this.export)

    return (
            <div className="container">
              <div className="row align-items-baseline">
                <div className="col-3">
                  <TxtInput id={this.props.id + '-input'} name="Provider" placeholder="Provider here" tips="Add your own cost calculation here" onChange={this.handleProviderChange}
                            class={this.classtxt(this.state.ProviderError)} Prepend={<span/>} InvalidMessage="Enter the solution provider"/>
                </div>
                <div className="col-3">
                  <TxtInput id={this.props.id + '-input'} name="Service" placeholder="Service here" tips="Add your own cost calculation here" onChange={this.handleServiceChange}
                            class={this.classtxt(this.state.ServiceError)} Prepend={<span/>} InvalidMessage="Enter the solution/service name"/>
                </div>
                <div className="col-5">
                  <PluginsCurrencyChange id="UserCostcurrency" name={Costname} onCostChange={this.handleCostChange}/>
                </div>
              </div>
              <div className="row align-items-baseline">
                <div className="col-auto">
                  <CheckboxInput id={this.props.id + '-input'} name="Charged by year"
                                 tips="Check if the service is charged by year so the cost will be adapted for the project duration" onChange={this.handleYearChange}/>
                </div>
              </div>
            </div>
    )
  }
}

UserCost.propTypes = {
  id: PropTypes.string,
  n: PropTypes.number,
  export: PropTypes.func,
  onCostChange: PropTypes.func,
  handlebyYearChange: PropTypes.func,
  handleServiceChange: PropTypes.func,
  handleProviderChange: PropTypes.func,
  handleCostChange: PropTypes.func
}

// Combine plugins
// ---------------------
// ---------------------
// Manages what's display inside a plugin : provider selector, select the components...
class ProviderPluginsSelector extends React.Component {
  constructor (props) {
    super(props)
    this.handleCostChange = this.handleCostChange.bind(this)
    this.handleProviderChange = this.handleProviderChange.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleAddPlugin = this.handleAddPlugin.bind(this)
    this.handleRmvPlugin = this.handleRmvPlugin.bind(this)
    this.handleProviderChangetxt = this.handleProviderChangetxt.bind(this)
    this.handleServiceChangetxt = this.handleServiceChangetxt.bind(this)
    this.handlebyYearChange = this.handlebyYearChange.bind(this)
    this.makeExportcmp = this.makeExportcmp.bind(this)
    this.makeExport = this.makeExport.bind(this)
    this.state = {
      selected: '0',
      keys: this.ProvidersName(props.data),
      n: '1',
      cost: '0',
      comments: '',
      Provider: '',
      Name: '',
      manualname: false,
      manbyyear: false,
      showPlus: false,
      exportcmp: ''
    }
  }

  handleCostChange (n, e) {
    if (this.state.cost !== e) {
      this.setState({ cost: e })
      this.props.handleCostChange(n, e)
    }
  }

  handleProviderChange (select) {
    this.setState({ selected: select })
    if (select > 0) {
      this.setState({ showPlus: true })
    } else {
      this.setState({ showPlus: false })
    }
    this.setState({ Provider: this.props.data.Data[select].Provider })
    this.setState({ Name: this.props.data.Data[select].Name })
    this.props.handleCostChange(this.props.n, this.state.cost)
    // Send a provider even when provider change, but not for empty values
    if (this.state.Provider.length) {
      Stats.RecordEvent('Provider', this.state.Provider, 0)
    }
  }

  componentDidUpdate () {
    this.props.handleCostChange(this.props.n, this.state.cost)
    this.makeExport()
  }

  makeExportcmp (data) {
    // this.state.exportcmp = data
    // console.log('in makeExportcmp', this.state.exportcmp, data)
    if (!Object.compare(this.state.exportcmp, data)) {
      this.setState({ exportcmp: data })
    }
  }

  makeExport () {
    const out = {
      Category: this.props.data.Name,
      Provider: this.state.Provider,
      Name: this.state.Name,
      Comments: this.state.comments,
      ExportCmp: this.state.exportcmp,
      Cost: this.state.cost
    }

    this.props.export(out, this.props.n)
  }

  handleCommentChange (com) {
    this.setState({ comments: com })
  }

  handleAddPlugin (n) {
    this.props.handleAddPlugin(n)
  }

  handleRmvPlugin (n) {
    this.props.handleRmvPlugin(n)
  }

  // The 3 nexts function are for user input management
  handleProviderChangetxt (txt) {
    this.setState({ Provider: txt })
  }

  handleServiceChangetxt (txt) {
    this.setState({ Name: txt })
  }

  handlebyYearChange (state) {
    this.setState({ manbyyear: state })
  }

  // Manage extra display info for a selected provider

  extrainfo (Cdata) {
    let ExtraInf = ''
    let ExtraInfUrl = ''
    if (typeof Cdata.ExtraInfoUrl !== 'undefined' && Cdata.ExtraInfoUrl !== '') {
      ExtraInfUrl = <p className="h6"><em><a href={Cdata.ExtraInfoUrl} target="_blank" rel="noreferrer">To know more</a></em></p>
    }

    if (typeof Cdata.ExtraInfo !== 'undefined' && Cdata.ExtraInfo !== '') {
      ExtraInf =
                <div className="col-3 align-self-end">
                  <div className="alert alert-info" role="alert">
                    <img src="./icon/info2.png" width="20"/> &nbsp;
                      {Cdata.ExtraInfo}
                      {ExtraInfUrl}
                  </div>
                </div>
    }
    return (ExtraInf)
  }

  render () {
    const selected = this.state.selected
    const Cmp = this.cmp2string(this.cmpdata(selected).Style)
    const Cdata = this.cmpdata(selected)
    const id = this.props.data.Name.replace(/\s/g, '') + this.props.n

    return (
            <div id={'plugin'}>

              <div className="card-header" id={id}>
                <ModuleHeader id={id} data={this.props.data} selected={selected} Cdata={Cdata} n={this.props.n} Cost={this.state.cost}
                              comments={this.state.comments} handleAddPlugin={this.handleAddPlugin} handleRmvPlugin={this.handleRmvPlugin}
                              keys={this.state.keys} showMinus={this.props.showMinus} showPlus={this.state.showPlus} conv={this.props.conv}/>
              </div>

              <div id={'collapse' + id} className="collapse" aria-labelledby={id} data-parent="#accordionplugins">
                <div className="card-body">
                  <div className="container">

                    <div className="row ">
                      <div className="col-auto align-self-end">
                        <div id="provider-selector" >
                          <SelectorInput id="providerselect" name="Select a solution" selected={selected} options={this.state.keys}
                                         class="btn-primary lg-btn" onChange={this.handleProviderChange} tips="Select a provider"/>
                        </div>
                      </div>
                      <div className="col-auto align-self-end">
                        <div id="plugin-knowmore" >
                          <MakeknowmoreInput key={selected} data={Cdata} name="" n="0" />
                        </div>
                      </div>
                      {this.extrainfo(Cdata)}
                      <div className="col-4 align-self-end">
                        <TxtInput type="text" id="module-comments" name="My Comments"
                                  placeholder="I can put a comment here..." onChange={this.handleCommentChange}/>
                      </div>

                    </div>

                    <div id="component" className="container bg-light">
                      <Cmp data={Cdata} key={selected} id="component-settings" onCostChange={this.handleCostChange} n={this.props.n}
                           handleProviderChange={this.handleProviderChangetxt} handleServiceChange={this.handleServiceChangetxt} handlebyYearChange={this.handlebyYearChange}
                           export={this.makeExportcmp}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
  }

  cmpdata (select) {
    const out = this.props.data.Data[select]
    const newKeys = this.state.keys
    if (this.state.manualname) {
      out.Name = this.state.Name
      out.ByYear = this.state.manbyyear
      if (this.state.Provider === '') {
        newKeys[select] = 'Please select a solution'
        this.setState({ keys: newKeys })
      } else {
        // this.state.keys[select] = this.state.Provider
        if (this.state.keys[select] !== this.state.Provider) {
          newKeys[select] = this.state.Provider
          this.setState({ keys: newKeys })
        }
      }
    }
    return out
  }

  // return the correct style fct from the str input
  cmp2string (str) {
    switch (str) {
      case 'AmountRatesCost' : return AmountRatesCost
      case 'CategoryCost' : return CategoryCost
      case 'CategoryAmountRatesCost' : return CategoryAmountRatesCost
      case 'NoneSelect' : return NoneSelect
      case 'UserCost' : {
        // TODO fixme: the script freezes when the user enters a char in any input field
        // this.state.manualname = true
        return UserCost }
    }
  }

  ProvidersName (main) {
    const data = main.Data

    const providers = []
    for (let i = 0; i < data.length; i++) {
      providers.push(data[i].Name)
    }
    return providers
  }
}

ProviderPluginsSelector.propTypes = {
  n: PropTypes.number,
  showMinus: PropTypes.bool,
  conv: PropTypes.object,
  data: PropTypes.object,
  export: PropTypes.func,
  handleCostChange: PropTypes.func,
  handleAddPlugin: PropTypes.func,
  handleRmvPlugin: PropTypes.func
}

// Displays the header of a plugin (button +- name cost ...)
class ModuleHeader extends React.Component {
  constructor (props) {
    super(props)
    this.handleAddPlugin = this.handleAddPlugin.bind(this)
    this.handleRmvPlugin = this.handleRmvPlugin.bind(this)
  }

  handleAddPlugin (n) {
    this.props.handleAddPlugin(n)
  }

  handleRmvPlugin (n) {
    this.props.handleRmvPlugin(n)
  }

  byyear (by) {
    if (by) {
      return (<span className="txtbyyear">{projectduration} <br/> years</span>)
    } else {
      return (<span></span>)
    }
  }

  render () {
    let minus = null
    let plus = null
    let convout = null
    if (this.props.showMinus) {
      minus = <ButtonInputWpop class="btn-danger btn-sm" id="plugins-add-btn"
                                   name={<img className="img-fluid" src="icon\minus.png" width="20"/>}
                                   onClick={this.handleRmvPlugin} n={this.props.n} tips="Remove this line"
                                    idp={this.props.id} info={this.props.data.Name}/>
    }
    if (this.props.showPlus) {
      plus = <ButtonInput class="btn-success btn-sm" id="plugins-add-btn" name={<img className="img-fluid" src="icon\plus.png" width="20"/>}
                         onClick={this.handleAddPlugin} n={this.props.n.toString()} tips={'Add a new ' + this.props.data.Name}/>
    }
    if (this.props.conv.Enable) {
      convout = <CostOutput id="ccostconv" class="itemcost" name="" value={ConvCurrency(this.props.Cost)} tips="Converted cost for this provider"/>
    }

    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col-1 align-self-start">
             <div className="row">
              <div className="col-6" id="plugin-add">
                {plus}
              </div>
              <div className="col-6" id="plugin-add">
                {minus}
              </div>
            </div>
            <div id="plugin-knowmore">
              <MakeknowmoreInput data={this.props.data} n={this.props.n}/>
            </div>
          </div>
          <div className=" col-1 align-self-start">
            <img className="img-fluid" src={'icon/' + this.props.data.Icon} width="100"/>
          </div>
          <div className="col-3 text-center">
            {/* <div className="row align-items-end"> */}
            {/*    <div className="col-auto"> */}
            <span data-toggle="tooltip" data-placement="top" title="Expand this..." >
              <button className="btn btn-outline-primary  dropdown-toggle" type="button" data-toggle="collapse" data-target={'#collapse' + this.props.id}
                      aria-expanded="false" aria-controls={'collapse' + this.props.id} id="btn-plugins" onClick={this.btnClick.bind(this)}>
                <span id={'plugin-number'}> {this.props.n + 1}. </span> <span id={'plugin-name'}>{this.props.data.Name}</span>
              </button>
            </span>
            {/*    </div> */}
            {/* </div> */}
          </div>
          <div id="plugin-info" className="col-4">
            <div className="row">
              {this.makeinfo(this.props.keys, this.props.selected, this.props.Cdata)}
            </div>
            <div className="row text-center">
              {this.props.comments}
            </div>

          </div>

          <div id="plugin-cost" className="col-2 ">
            <CostOutput id="ccost" class="itemcost" name="" value={this.props.Cost} tips="Total cost for this provider"/>
              {convout}
          </div>
          <div className="col-1">
            {this.byyear(this.props.Cdata.ByYear)}
          </div>

        </div>

     </div>
    )
  }

  btnClick () {
    // Send a category even when someone click on the category btn
    Stats.RecordEvent('Category', this.props.data.Name, this.props.n)
  }

  makeinfo (keys, selected, Cdata) {
    let name = Cdata.Provider
    console.log([name])
    if (name === 'None' && keys[selected] === '') {
      name = 'Select a solution (if applicable)'
      return (<span id="module-provider">{name}</span>)
    } else if (keys[selected] === 'None') {
      return (<span id="module-provider">{name}</span>)
    } else {
      return (<span><span id="module-name">{keys[selected]}</span>  <span id="module-provider">({name})</span></span>)
    }
  }
}

ModuleHeader.propTypes = {
  showMinus: PropTypes.bool,
  showPlus: PropTypes.bool,
  id: PropTypes.string,
  keys: PropTypes.array,
  selected: PropTypes.string,
  n: PropTypes.number,
  comments: PropTypes.string,
  Cost: PropTypes.string,
  Cdata: PropTypes.object,
  handleAddPlugin: PropTypes.func,
  handleRmvPlugin: PropTypes.func,
  conv: PropTypes.object,
  data: PropTypes.object
}

// displays one kind plugin it manages the add and removes option
class ManagePlugins extends React.Component {
  constructor (props) {
    super(props)
    this.handleCostChange = this.handleCostChange.bind(this)
    this.handleAddPlugin = this.handleAddPlugin.bind(this)
    this.handleRmvPlugin = this.handleRmvPlugin.bind(this)
    this.makeExportplug = this.makeExportplug.bind(this)
    this.makeExport = this.makeExport.bind(this)

    this.state = {
      displayed: [],
      varsum: {},
      plugins: [],
      export: []
    }
    this.state.displayed.push(randomInt(this.state.displayed))
  }

  handleRmvPlugin (n) {
    $('#' + n.target).modal('hide')
    const tmp = this.state.displayed
    tmp.splice(n.n, 1)
    this.setState({ displayed: tmp })
    this.handleCostChange(n.n, 0)
    this.state.export.splice(n.n, 1)
  }

  handleAddPlugin (n) {
    const tmp = this.state.displayed
    tmp.splice(n + 1, 0, randomInt(this.state.displayed))
    this.setState({ displayed: tmp })
  }

  handleCostChange (n, cost) {
    const newVarsum = this.state.varsum
    if (!Object.compare(newVarsum[n], cost)) {
      newVarsum[n] = cost
      this.setState({ varsum: newVarsum })
    }
    // this.state.varsum[n] = cost
    this.props.handleCostChange(this.props.n, sum(this.state.varsum))
  }

  makeExportplug (data, n) {
    const newExport = this.state.export
    // console.log('in ManagerPlugin.makeExportplug', Object.compare(newExport[n], data), this.state.export[n] === data)
    if (!Object.compare(newExport[n], data)) {
      newExport[n] = data
      this.setState({ export: newExport })
    }
    // this.state.export[n] = data
    this.makeExport()
  }

  makeExport () {
    if (this.state.export.length === this.giveN()) {
      this.props.export(this.state.export, this.props.n)
    }
  }

  giveId (index) {
    return this.state.displayed[index]
  }

  giveN () {
    const disp = this.state.displayed
    return disp.length
  }

  componentDidUpdate () {
    this.makeExport()
  }

  render () {
    let showMinus = false
    if (this.giveN() > 1) {
      showMinus = true
    }
    this.makeExport()
    return (
              <div>
                  <Repeat numTimes={this.giveN()}>
                        {(index) => <ProviderPluginsSelector data={this.props.data} key={this.state.displayed[index]}
                                                 showMinus={showMinus} n={index}
                                                 handleCostChange={this.handleCostChange} handleAddPlugin={this.handleAddPlugin}
                                                             handleRmvPlugin={this.handleRmvPlugin} export={this.makeExportplug}
                                                             conv={this.props.conv}/>}

                  </Repeat>
              </div>
    )
  }
}

ManagePlugins.propTypes = {
  handleCostChange: PropTypes.func,
  export: PropTypes.func,
  n: PropTypes.number,
  conv: PropTypes.object,
  data: PropTypes.object
}

// displays all the plugins defined in the Maindata
class PluginsMain extends React.Component {
  constructor (props) {
    super(props)
    this.handleCostChange = this.handleCostChange.bind(this)

    this.makeExportplug = this.makeExportplug.bind(this)
    this.makeExport = this.makeExport.bind(this)

    this.state = {
      varsum: {},
      export: []
    }
  }

  handleCostChange (name, e) {
    // this.state.varsum[name] = e
    const newVarsum = this.state.varsum
    // here we are simply comparing numbers, no need for Object.compare()
    if (newVarsum[name] !== e) {
      newVarsum[name] = e
      this.setState({ varsum: newVarsum })
    }
    this.props.TotalCost(sum(this.state.varsum))
  }

  makeExportplug (data, n) {
    if (this.state.export[n] !== data) {
      // this.state.export[n] = data
      const newExport = this.state.export
      newExport[n] = data
      this.setState({ export: newExport })
    }
    this.makeExport()
  }

  makeExport () {
    if (this.state.export.length === this.props.data.length) {
      this.props.export(this.state.export)
    }
  }

  render () {
    return (
            <div>
              <div id="PluginsMain">
                <div className="card">
                  <div className="card-header text-white bg-dark">
                    <div className="row">
                      <div className="col-2 text-center">
                        Line controls
                      </div>

                      <div className="col-3 text-center">
                        Category
                      </div>

                      <div className="col-4 text-center">
                        Provider information
                      </div>

                      <div className="col-2 text-center">
                        Cost
                      </div>

                      <div className="col-1 text-center">

                      </div>
                    </div>
                  </div>

                  <div className="card ">
                    <div className="accordion" id="accordionplugins">
                      <Repeat numTimes={this.props.data.length}>
                        {(index) => <ManagePlugins data={this.props.data[index]} key={index}
                                                   export={this.makeExportplug} n={index} handleCostChange={this.handleCostChange}
                                                   conv={this.props.conv}/>}
                      </Repeat>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
  }
}

PluginsMain.propTypes = {
  export: PropTypes.func,
  TotalCost: PropTypes.func,
  conv: PropTypes.object,
  data: PropTypes.array
}

// MAIN
// ---------------------
// ---------------------
class Main extends React.Component {
  constructor (props) {
    MoneyGetRates()
    super(props)
    this.handleCostChange = this.handleCostChange.bind(this)
    this.makeExportmain = this.makeExportmain.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
    this.handleConvMoneyChange = this.handleConvMoneyChange.bind(this)
    this.btnClick = this.btnClick.bind(this)

    this.state = {
      total: 0,
      export: [],
      exportmain: {},
      name: '',
      duration: MainData.DefaultDuration,
      conv: { Enable: false, Cur: '' }
    }
    projectduration = this.state.duration
    this.init = true
  }

  componentDidUpdate () {
    _paq.push(['enableLinkTracking'])
  }

  handleCostChange (total) {
    if (this.state.total !== total) {
      this.setState({ total })
    }
  }

  makeExportmain (idata) {
    const tmp = JSON.parse(JSON.stringify(idata))
    let disp = false
    if (!this.init) {
      if (!Object.compare(tmp, this.state.exportmain.data)) {
        disp = true
      }
    }
    if ((this.init) || (disp)) {
      this.setState({ exportmain: { data: tmp, total: toMoney(this.state.total) } })
      this.init = false
    }
  }

  handleNameChange (name) {
    this.setState({ name })
    projectname = name
  }

  handleDurationChange (d) {
    this.setState({ duration: d })
    projectduration = d
  }

  handleConvMoneyChange (conv) {
    this.setState({ conv })
  }

  btnClick (name, value) {
    Stats.RecordEvent('Options', name, value)
  }

  render () {
    return (
            <div id="main">
              <PopupStats />
                {this.page_head()}
                <div id="plugins-body" className="container">

                  {this.project_info()}

                  <PluginsMain TotalCost={this.handleCostChange} data={MainData.Data} export={this.makeExportmain} conv={this.state.conv} />

                  {this.final_cost(this.state.conv)}

                  <ManageExport data={this.state.exportmain} conv={this.state.conv}/>

                  {this.howto()}
                </div>

              {this.page_foot()}
            </div>
    )
  }

  project_info () {
    return (
            <div id="ProjectInfo">

              <div className="card-header">
                <img src="./icon/uset.png" width="40" />
                <img src="./icon/uset.png" width="40" />
                <img src="./icon/uset.png" width="40" />
              </div>

              <div className="card">
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <TxtInput type="text" id="user-projectname" name="Project Name"
                                placeholder="My project name" onChange={this.handleNameChange}/>
                    </div>
                    <div className="col-3">
                      <AmountInput id="project-duration" min="1" max="10" step="1" name="Project Duration" unit="year" tips="Select the duration of the project (in year)"
                                   value={this.state.duration.toString()} onChange={this.handleDurationChange}/>
                    </div>
                    <div className="col-3">
                      <CurrencySelect id="maincurrency" money={this.handleConvMoneyChange}/>
                    </div>
                  </div>
                </div>
              </div>

            </div>
    )
  }

  // Display the total cost
  final_cost (conv) {
    let disps = ''
    if (projectduration > 1) disps = 's'
    let convout = ''
    if (conv.Enable) convout = <CostOutput id="convctotal" class="costoutput" name="Total Cost" value={ConvCurrency(this.state.total)} tips="Converted Total cost for the project"/>

    return (
            <div className="card" id="finalcost">

              <div className="card bg-light  ">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-1">
                    </div>
                    <div className="col-1">
                      { /* <img className="img-fluid" src="./icon/totalcost.png" width="100"/> */ }
                    </div>
                    <div className="col-5 " id="plugin-name">
                      <h3>Total Cost for {projectduration} year{disps}</h3>
                    </div>
                    <div id="plugin-cost" className="col-5  text-right align-self-center">
                      <CostOutput name="Total Cost" id="ctotal" class="costoutput" value={toMoney(this.state.total)} tips="Total cost for the project"/>
                        {convout}
                    </div>
                  </div>
                </div>
              </div>
            </div>)
  }

  // Define the head (top) of the page
  page_head () {
    let helpbtn = null
    let feedbackbtn = null
    let imglogo = null
    if (MainData.HelpUrl != null && MainData.HelpUrl !== '') {
      helpbtn = <a className="btn btn-danger" id="head-help" target="_blank" href={MainData.HelpUrl}
                       onClick={() => this.btnClick('helpbtn', 0)} rel="noreferrer">
                            <img src="./icon/help.png" width="20"/>&nbsp;I need help with my DMP</a>
      feedbackbtn = <a className="btn btn-secondary" id="feedback" target="_blank" href={MainData.FeedbackUrl}
                       onClick={() => this.btnClick('feedbackbtn', 0)} rel="noreferrer">
                            Send feedback</a>
    }
    if (MainData.InstLogo != null && MainData.InstLogo !== '') { imglogo = <img src={'./icon/' + MainData.InstLogo} width={MainData.InstLogoWidth}/> }
    return (
            <div className="jumbotron jumbotron-fluid" id="page_head">
              <div className="container">
                <div className="row">
                  <div className="col-auto">
                    <img src="./icon/costcalc.png" width="100"/>
                  </div>
                  <div className="col-auto">
                    <h1 className="display-5"> {MainData.InstName} <br/>Cost Calculator for Data Management</h1>
                  </div>
                  <div className="col-auto">
                    {imglogo}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p className="lead">
                      Welcome to our cost calculator. This tool will help researchers to
                      estimate the cost of managing, storing and publishing data.
                    </p>
                    <p className="lead">
                      Many providers are included in the service and you will be able to calculate a cost
                      based on your needs.
                      <br/>Total cost is calculated dynamically based on your inputs.
                    </p>
                    <p className="lead">
                      We hope you will enjoy this tool and it will be useful for you. Feedback from users and service providers is always welcome!
                    </p>
                    <ButtonInput class="btn btn-primary" id="head-howto" name={<span>To Know More (HOWTO)</span>} onClick={this.move2howto}/> &nbsp;
                      {feedbackbtn} &nbsp; {helpbtn}
                  </div>
                </div>
              </div>
            </div>
    )
  }

  // Define the foot (bottom) of the page
  page_foot () {
    return (
            <div id="page_foot" >
              <div className="jumbotron jumbotron-fluid">
                <div className="alert alert-danger" role="alert" id="infotxt">
                  The values we report are only informative and should not be used for exact calculations. However, feel free to contact us if you see some mistake, or if you would like us to
                  add other services.
                  <br/><strong>Last Database Update : {MainData.Updated} </strong>
                </div>
                <div id="service">
                  <p>This application has been developed by the <a href="https://researchdata.epfl.ch">Resarch Data Management Team</a> of the <a href="https://library.epfl.ch">EPFL Library</a>  <br/>
                     This software is published under GPL-3.0-only license, and you are using <strong>Version {MainData.Version}</strong>.<br/>
                     Source code can be download <a href="https://github.com/epfllibrary/costcalc">here</a></p>
                  <p><small>Icons are from the Noun Project (Book by Randi NI, Storage by I Pitu, Database by Novalyi, data cloud by Vectors Market, Information and Next by Gregor Cresnar, Database by Creative Mahira, Archive by dp indo)</small></p>
                </div>
              </div>
            </div>
    )
  }

  // Define the howto (user guide)
  howto () {
    let curconv = null
    if (MoneyEnable) {
      curconv =
              <dl className="row">
                <dt className="col-sm-3">Change Currency</dt>
                <dd className="col-sm-9">
                  <p>If you need another currency than {MainData.Currency} you can add an extra currency by selecting in the <mark>Change Currency menu</mark></p>
                  <p> The current exchange rate is automatically applied using <a href="https://openexchangerates.org/">openexchangerates</a></p>
                </dd>
              </dl>
    }
    return (
            <div id="howto">
              <div className="card" >
                <div className="card-header ">
                  <h2><img src="./icon/sliders.png" width="40"/> HOWTO</h2>
                </div>
                <div className="card-body">
                  <dl className="row">
                    <dt className="col-sm-3">Project Name and Duration</dt>
                    <dd className="col-sm-9">
                      <p>  The Project name is only used for you.</p>
                      <p> <mark>Project Duration</mark> is used for subscription services charged by year: the yearly cost will be multiplied by the duration of the project.</p>
                    </dd>
                  </dl>

                  {curconv}
                  <dl className="row">
                    <dt className="col-sm-3">Categories</dt>
                    <dd className="col-sm-9">
                      This tool is divided into categories (for example Active storage). Click
                      on the category name, and it will expand.
                    </dd>
                  </dl>

                  <dl className="row">
                    <dt className="col-sm-3">Solutions: platforms and providers</dt>
                    <dd className="col-sm-9">
                      <p>
                        Solutions can be chosen from the <mark>Select a solution box</mark>. You can then tune your settings for this provider to fit your needs.
                      </p>

                      <p>
                        If the solution you want is not present, you can add it manually using the <mark>Other</mark> item, and then enter your provider/service and cost.
                      </p>
                    </dd>
                  </dl>

                  <dl className="row">
                    <dt className="col-sm-3">Add or Remove Line</dt>
                    <dd className="col-sm-9">
                      <p>If you want to add a new line use the <ButtonInput class="btn-success btn-sm" id="plugins-add-btn" name={<img className="img-fluid" src="icon\plus.png" width="20"/>}
                                                                            tips={'Add a new category'} onClick={this.fctnull}/> button.
                      </p>
                      <p>
                        You can also remove a line with <ButtonInput class="btn-danger btn-sm" id="plugins-add-btn"
                                                                     name={<img className="img-fluid" src="icon\minus.png" width="20"/>}
                                                                     tips={'Remove this line'} onClick={this.fctnull}/> button.
                      </p>
                    </dd>
                  </dl>

                  <dl className="row">
                    <dt className="col-sm-3">To know more about</dt>
                    <dd className="col-sm-9">
                      Some extra information about the category or the provider can be obtained with the <ButtonInput class="btn-primary btn-sm" id="plugins-add-btn"
                                                                                                                      name={<img className="img-fluid" src="icon\info.png" width="20"/>}
                                                                                                                      tips={'Know more'} onClick={this.fctnull}/> button.
                    </dd>
                  </dl>

                  <dl className="row">
                    <dt className="col-sm-3">Comments your input</dt>
                    <dd className="col-sm-9">
                      Comments are for your own usage, you can use it for remembering what each section is and for a nice export.
                    </dd>
                  </dl>

                  <dl className="row">
                    <dt className="col-sm-3">Export</dt>
                    <dd className="col-sm-9">
                      You can export your work into different formats : <br/>
                      <samp>HTML</samp> : This format can be used in any wordprocessing software (such as Microsoft Word or Libreoffice).<br/>
                      <samp>HTML Source code</samp>, <samp>Markdown</samp>, and <samp>CSV</samp> formats are also possible.<br/>
                      Click on the  <ButtonInput class="btn-secondary" id="btn-export" name={<span>Copy to Clipboard</span>} tips="Copy the output into your clipboard"
                                                 onClick={this.fctnull}/> in order to copy your work into your clipboard.
                      A simple <kbd>Paste</kbd> will transfer your work into any software.

                    </dd>
                  </dl>

                </div>
              </div>
            </div>)
  }

  // Function use by the howto btn to move the page
  move2howto () {
    Stats.RecordEvent('Options', 'howtobtn', 0)
    $('html,body').animate({ scrollTop: $('#howto').offset().top }, 'slow')
  }

  fctnull () {}
}

// Main Declaration
// ---------------------
// ---------------------
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<Main />)

// Display the stats popup after 10s
if (Stats.Enable) { setTimeout(function () { $('#PopupStats').modal('show') }, 10000) }
// Enable tooltip
$('[data-toggle="tooltip"]').tooltip()
